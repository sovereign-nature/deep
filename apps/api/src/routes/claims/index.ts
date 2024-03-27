import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { decode, verify } from 'hono/jwt';
import { env } from 'hono/adapter';
import { collections } from './config';

//TODO: Replace with zod schema
type ClaimBody = {
  token: string;
  address: '0x{string}';
};

//TODO: Replace with zod schema
type JWTPayload = { id: string; collection: string; seed: number };

//TODO: Replace with zod schema
type CrossmintResponse = {
  id: string;
  onchain: {
    status: string;
    chain: string;
    contractAddress: string;
    owner?: string;
  };
  actionId: string;
};

const app = new Hono();

app.post(
  '/',
  zValidator(
    'json',
    z.object({
      token: z.string(),
      address: z.string(),
    })
  ),

  async (c) => {
    const { CROSSMINT_API_URL } = env<{ CROSSMINT_API_URL: string }>(c);
    const { CROSSMINT_API_KEY } = env<{ CROSSMINT_API_KEY: string }>(c);
    const { CLAIMS_SECRET } = env<{ CLAIMS_SECRET: string }>(c);

    const body: ClaimBody = await c.req.json();
    const { token, address } = body;

    try {
      await verify(token, CLAIMS_SECRET);
    } catch (e) {
      return c.json({ error: true, message: 'Invalid token' }, 400);
    }

    const { payload }: { payload: JWTPayload } = decode(token);

    const collectionId: string = payload.collection;
    const collectionConfig = collections[collectionId];

    const mintingConfig = {
      metadata: collectionConfig.metadata,
      recipient: `${collectionConfig.network}:${address}`,
    };

    const resp = await fetch(
      `${CROSSMINT_API_URL}/${collectionId}/nfts/${payload.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(mintingConfig),
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': CROSSMINT_API_KEY,
        },
      }
    );

    const data = (await resp.json()) as CrossmintResponse;

    if (data.onchain.owner && data.onchain.owner !== address) {
      return c.json(
        {
          error: true,
          message: 'Token was already claimed for different owner address',
        },
        400
      );
    }

    return c.json(data);
  }
);

export default app;
