import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { parseAssetDID } from '@sni/address-utils';
import { getAsset } from '../shared';

const app = new Hono();

const getAssetRoute = app.get('/:assetDid', async (c) => {
  const assetDID = c.req.param('assetDid');

  const { OPEN_SEA_API_KEY } = env<{ OPEN_SEA_API_KEY: string }>(c);

  // Parsing DID
  try {
    const parsedData = parseAssetDID(assetDID);

    //TODO: Refactor getAsset to getAssetByDid
    const assetData = await getAsset(
      parsedData.network,
      parsedData.contractAddress,
      parsedData.tokenId,
      OPEN_SEA_API_KEY
    );
    return c.json(assetData);
  } catch (e) {
    return c.json({ error: true, message: 'Asset not found' }, 404);
  }
});

export type GetAssetRoute = typeof getAssetRoute;

export default app;
