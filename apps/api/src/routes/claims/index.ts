import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { decode, verify } from 'hono/jwt';
import { env } from 'hono/adapter';
import { collections } from './config';
import { ClaimBody, JWTToken, CrossmintResponse } from './schemas';

//TODO: Replace with zod schema

const app = new Hono();

app.post(
  '/',
  zValidator('json', ClaimBody),

  async (c) => {
    const { CROSSMINT_API_URL } = env<{ CROSSMINT_API_URL: string }>(c);
    const { CROSSMINT_API_KEY } = env<{ CROSSMINT_API_KEY: string }>(c);
    const { CLAIMS_SECRET } = env<{ CLAIMS_SECRET: string }>(c);

    const body = ClaimBody.parse(await c.req.json());

    const { token, address } = body;

    try {
      await verify(token, CLAIMS_SECRET);
    } catch (e) {
      return c.json({ error: true, message: 'Invalid token' }, 400);
    }

    const { payload } = JWTToken.parse(decode(token));

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

    const data = CrossmintResponse.parse(await resp.json());

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
