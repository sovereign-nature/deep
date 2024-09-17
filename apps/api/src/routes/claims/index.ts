import { zValidator } from '@hono/zod-validator';
import { OpenAPIHono } from '@hono/zod-openapi';
import { decode, verify } from 'hono/jwt';
import { env } from 'hono/adapter';
import { createAssetDID } from '@sni/address-utils';
import { CollectionConfig, collections } from './config';
import { ClaimBody, JWTToken } from './schemas';
import { mintOptimismToken } from './providers/crossmint';
import { mintUniqueToken } from './providers/unique';
import { Payload } from './types';
import { createClaimLink } from './lib';
import { logger } from '$lib/logger';
import { getRandomInt } from '$lib/utils';
import { sendTokenEmail } from '$lib/resend';
import { CrossmintResponse } from '$lib/shared/schemas';

const app = new OpenAPIHono();

export type MintRequest = {
  address: string;
  payload: Payload;
  collectionConfig: CollectionConfig;
};

//TODO: Check this endpoint with fresh eyes
app.post(
  '/',
  zValidator('json', ClaimBody),

  async (c) => {
    const { CLAIMS_SECRET } = env<{ CLAIMS_SECRET: string }>(c);

    const { MINTING_QUEUE } = env<{ MINTING_QUEUE: Queue<string> }>(c);

    const { MINTING_KV } = env<{ MINTING_KV: KVNamespace }>(c); //TODO: Join KVs into one table
    const { CLAIMS_KV } = env<{ CLAIMS_KV: KVNamespace }>(c);
    const { EMAILS_KV } = env<{ EMAILS_KV: KVNamespace }>(c);

    const { RESEND_API_KEY } = env<{ RESEND_API_KEY: string }>(c);

    const body = c.req.valid('json');

    const { token, address, email } = body;

    // Verify token
    try {
      await verify(token, CLAIMS_SECRET);
    } catch (e) {
      logger.error(`Invalid token: ${token}`);
      return c.json({ error: true, message: 'Invalid token' }, 400);
    }

    const { payload } = JWTToken.parse(decode(token));
    const collectionConfig = collections[payload.collection];

    const mintId = payload.id;

    const claim = await CLAIMS_KV.get(`${address}-${payload.collection}`);
    const mintResponse = await MINTING_KV.get(mintId);

    if (claim && mintResponse === null) {
      logger.error(
        `Token from ${collectionConfig.name} was already claimed for this wallet`
      );
      return c.json(
        {
          error: true,
          message: `Token from ${collectionConfig.name} was already claimed for this wallet`,
        },
        400
      );
    }

    const network = collectionConfig.network;

    switch (network) {
      case 'optimism':
        return mintOptimismToken(address, payload, collectionConfig, c);
      case 'opal':
      case 'unique': {
        if (mintResponse === null) {
          logger.info(`Minting ${mintId}`);

          const image = collectionConfig.metadata.image[payload.seed];
          const pendingResponse = {
            id: payload.id,
            onChain: {
              status: 'pending',
              chain: collectionConfig.network,
              contractAddress: collectionConfig.externalId,
            },
            metadata: {
              image: image,
            },
            actionId: payload.id,
          };

          try {
            CrossmintResponse.parse(pendingResponse);
          } catch (e) {
            logger.error(e);
            return c.json(
              {
                error: true,
                message: `Internal server error`,
              },
              500
            );
          }

          logger.info(`Sending minting ${mintId} to queue`);
          await MINTING_KV.put(mintId, JSON.stringify(pendingResponse)); //This is a bug - MINTING_KV takes too much time to update, so it gives us null response
          await MINTING_QUEUE.send(
            JSON.stringify({ address, payload, collectionConfig }),
            { contentType: 'json' }
          );

          await CLAIMS_KV.put(`${address}-${payload.collection}`, payload.id);

          logger.debug(`Message queue received ${mintId}`);

          if (email) {
            logger.info(`Sending email`);

            const claimLink = await createClaimLink(
              {
                collectionId: collectionConfig.name,
                seed: getRandomInt(0, 2), //TODO: Fetch seed range from config
                realCollection: 'dotphin-proofs', //TODO: Fetch real collection from config
              },
              CLAIMS_SECRET
            );

            //TODO: Move to queue if there are errors
            const res = await sendTokenEmail(
              { to: email, claimLink },
              RESEND_API_KEY
            );

            if (res.error) {
              logger.error(`Error sending email: ${res.error.message}`);
            } else {
              logger.info(`Email sent`);
              await EMAILS_KV.put(address, email);
            }
          }

          return c.json(pendingResponse);
        }

        const parsedMintResponse = CrossmintResponse.parse(
          JSON.parse(mintResponse)
        );

        const owner = parsedMintResponse.onChain.owner;

        if (owner && owner.toLocaleLowerCase() !== address.toLowerCase()) {
          logger.error(
            `Token was already claimed for different owner address: ${owner}`
          );

          return c.json(
            {
              error: true,
              message: 'Token was already claimed for different owner address',
            },
            400
          );
        }

        if (parsedMintResponse.onChain.tokenId) {
          const assetDID = createAssetDID(
            collectionConfig.network,
            collectionConfig.tokenStandard,
            collectionConfig.externalId,
            parsedMintResponse.onChain.tokenId
          );

          return c.json({
            ...parsedMintResponse,
            assetDID,
          });
        }

        return c.json(parsedMintResponse);
      }
      default:
        logger.error(`Network ${network} not supported`);
        return c.json({ error: true, message: 'Network not supported' }, 400);
    }
  }
);

type Env = {
  WALLET_MNEMONIC: string;
  MINTING_KV: KVNamespace;
  CLAIMS_KV: KVNamespace;
};

export async function claimsQueue(batch: MessageBatch<string>, env: Env) {
  for (const message of batch.messages) {
    const mintRequest = JSON.parse(message.body) as MintRequest;

    const network = mintRequest.collectionConfig.network;

    switch (network) {
      case 'opal':
      case 'unique':
        {
          const mintId = mintRequest.payload.id;
          logger.info(
            `Queue job is started to mint ${mintId} on ${network} network in collection ${mintRequest.collectionConfig.externalId}`
          );

          const successResponse = await mintUniqueToken(
            network,
            mintRequest.address,
            mintRequest.payload, //TODO: Retype payload, should't require collectionId
            mintRequest.collectionConfig,
            env.WALLET_MNEMONIC
          );

          const parsedResponse = CrossmintResponse.parse(successResponse);

          await env.MINTING_KV.put(mintId, JSON.stringify(parsedResponse));

          logger.info(
            `Queue job is finished to mint ${mintId} on ${network} network`
          );
        }
        break;
      default:
        break;
    }
  }
}

export default app;
