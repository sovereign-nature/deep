import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { decode, verify } from 'hono/jwt';
import { env } from 'hono/adapter';
import { CollectionConfig, collections } from './config';
import { ClaimBody, JWTToken } from './schemas';
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
          const pendingResponse = {
            id: payload.id,
            onChain: {
              status: 'pending',
              chain: collectionConfig.network,
              contractAddress: collectionConfig.externalId,
            },
            actionId: payload.id,
          };

          await MINTING_KV.put(mintId, JSON.stringify(pendingResponse));

          MINTING_QUEUE.send({ address, payload, collectionConfig });

          return c.json(pendingResponse);
        }

        return c.json(JSON.parse(mintResponse));
      }
      default:
        return c.json({ error: true, message: 'Network not supported' }, 400);
    }
  }
);

interface Env {
  WALLET_MNEMONIC: string;
  MINTING_KV: KVNamespace;
}

export async function claimsQueue(batch: MessageBatch<MintRequest>, env: Env) {
  for (const message of batch.messages) {
    const mintRequest = message.body;

    const network = mintRequest.collectionConfig.network;

    switch (network) {
      case 'opal':
        {
          const mintId = mintRequest.payload.id;
          try {
            //TODO: Add proper logger
            console.log('Minting unique token');

            const successResponse = await mintUniqueToken(
              mintRequest.address,
              mintRequest.payload,
              mintRequest.collectionConfig,
              env.WALLET_MNEMONIC
            );
            await env.MINTING_KV.put(mintId, JSON.stringify(successResponse));
          } catch (e) {
            console.log('Error minting token');
            console.error(e);

            await env.MINTING_KV.delete(mintId);
          }
        }
        break;
      default:
        break;
    }
  }
}

export default app;
