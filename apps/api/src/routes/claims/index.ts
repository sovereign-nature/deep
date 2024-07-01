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

    const body = ClaimBody.parse(await c.req.json());

    const { token, address } = body;

    try {
      await verify(token, CLAIMS_SECRET);
    } catch (e) {
      return c.json({ error: true, message: 'Invalid token' }, 400);
    }

    const { payload } = JWTToken.parse(decode(token));

    const collectionConfig = collections[payload.collection];
    const network = collectionConfig.network;

    switch (network) {
      case 'optimism':
        return mintOptimismToken(address, payload, collectionConfig, c);
      case 'opal':
        MINTING_QUEUE.send({ address, payload, collectionConfig });
        return c.json({
          id: payload.id,
          onChain: {
            status: 'pending',
            chain: collectionConfig.network,
            contractAddress: collectionConfig.externalId,
          },
          actionId: payload.id,
        });
      default:
        return c.json({ error: true, message: 'Network not supported' }, 400);
    }
  }
);

interface Env {
  WALLET_MNEMONIC: string;
}

export async function claimsQueue(batch: MessageBatch<MintRequest>, env: Env) {
  for (const message of batch.messages) {
    const mintRequest = message.body;

    const network = mintRequest.collectionConfig.network;

    switch (network) {
      case 'opal':
        console.log(
          await mintUniqueToken(
            mintRequest.address,
            mintRequest.payload,
            mintRequest.collectionConfig,
            env.WALLET_MNEMONIC
          )
        );
        break;
      default:
        break;
    }
  }
}

export default app;
