import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { decode, verify } from 'hono/jwt';
import { env } from 'hono/adapter';
import { logger } from '../../utils/logger';
import { CollectionConfig, collections } from './config';
import { ClaimBody, CrossmintResponse, JWTToken } from './schemas';
import { mintOptimismToken } from './providers/crossmint';
import { mintUniqueToken } from './providers/unique';
import { Payload } from './types';

const app = new Hono();

export type MintRequest = {
  address: string;
  payload: Payload;
  collectionConfig: CollectionConfig;
};

app.post(
  '/',
  zValidator('json', ClaimBody),

  async (c) => {
    const { CLAIMS_SECRET } = env<{ CLAIMS_SECRET: string }>(c);
    const { MINTING_QUEUE } = env<{ MINTING_QUEUE: Queue<MintRequest> }>(c);
    const { MINTING_KV } = env<{ MINTING_KV: KVNamespace }>(c);

    const body = ClaimBody.parse(await c.req.json());

    const { token, address } = body;

    try {
      await verify(token, CLAIMS_SECRET);
    } catch (e) {
      logger.error(e);
      return c.json({ error: true, message: 'Invalid token' }, 400);
    }

    const { payload } = JWTToken.parse(decode(token));
    const mintId = payload.id;

    const collectionConfig = collections[payload.collection];
    const network = collectionConfig.network;

    switch (network) {
      case 'optimism':
        return mintOptimismToken(address, payload, collectionConfig, c);
      case 'opal': {
        const mintResponse = await MINTING_KV.get(mintId);

        if (mintResponse === null) {
          logger.info(`Minting ${mintId}`);

          const pendingResponse = {
            id: payload.id,
            onChain: {
              status: 'pending',
              chain: collectionConfig.network,
              contractAddress: collectionConfig.externalId,
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
          await MINTING_KV.put(mintId, JSON.stringify(pendingResponse));
          await MINTING_QUEUE.send({ address, payload, collectionConfig });

          logger.debug(`Message queue received ${mintId}`);

          return c.json(pendingResponse);
        }

        const parsedMintResponse = CrossmintResponse.parse(
          JSON.parse(mintResponse)
        );

        const owner = parsedMintResponse.onChain.owner;

        if (owner && owner.toLocaleLowerCase() !== address.toLowerCase()) {
          return c.json(
            {
              error: true,
              message: 'Token was already claimed for different owner address',
            },
            400
          );
        }

        return c.json(JSON.parse(mintResponse));
      }
      default:
        return c.json({ error: true, message: 'Network not supported' }, 400);
    }
  }
);

type Env = {
  WALLET_MNEMONIC: string;
  MINTING_KV: KVNamespace;
};

export async function claimsQueue(batch: MessageBatch<MintRequest>, env: Env) {
  for (const message of batch.messages) {
    const mintRequest = message.body;

    const network = mintRequest.collectionConfig.network;

    switch (network) {
      case 'opal':
        {
          const mintId = mintRequest.payload.id;
          logger.info(
            `Queue job is started to mint ${mintId} on ${network} network`
          );

          const successResponse = await mintUniqueToken(
            mintRequest.address,
            mintRequest.payload,
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
