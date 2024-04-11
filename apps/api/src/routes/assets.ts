import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { getAssetByDID } from '@sni/clients/assets-client';
import { parseAssetDID } from '@sni/address-utils';

const app = new Hono();

const getAssetRoute = app.get('/:assetDid', async (c) => {
  const { OPEN_SEA_API_KEY } = env<{ OPEN_SEA_API_KEY: string }>(c);
  const { ALCHEMY_API_KEY } = env<{ ALCHEMY_API_KEY: string }>(c);

  const assetDID = c.req.param('assetDid');
  parseAssetDID(assetDID);

  try {
    const assetData = await getAssetByDID(assetDID, {
      openSeaAPIKey: OPEN_SEA_API_KEY,
      alchemyAPIKey: ALCHEMY_API_KEY,
    });
    return c.json(assetData);
  } catch (e) {
    console.error(e);
    return c.json({ error: true, message: 'Asset not found' }, 404);
  }
});

export type GetAssetRoute = typeof getAssetRoute;

export default app;
