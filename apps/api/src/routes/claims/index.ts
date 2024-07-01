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
        return mintUniqueToken(address, payload, collectionConfig, c);
      default:
        return c.json({ error: true, message: 'Network not supported' }, 400);
    }
  }
);

app.post('/v2', zValidator('json', ClaimBody), async (c) => {
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

  MINTING_QUEUE.send({ address, payload, collectionConfig });

  return c.json({ success: true });
});

export async function claimsQueue(batch: MessageBatch<MintRequest>) {
  console.log('Processing batch', batch);

  // for (const message of batch.messages) {
  //   const mintRequest = message.body;

  //   console.log('Processing minting request', mintRequest);
  // }

  const response = await fetch('https://httpbin.org/delay/40', {
    headers: { Accept: 'application/json' },
  });

  const nftResponse = await response.json();

  console.log('NFT Response', nftResponse);

  console.log('Processed batch');
}

export default app;
