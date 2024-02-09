import { Hono } from 'hono';
import { env } from 'hono/adapter';

import { getAsset, parseDID } from '../lib/shared';

const app = new Hono();

app.get('/:assetDID', async (c) => {
  const assetDID = c.req.param('assetDID');

  const { OPEN_SEA_API_KEY } = env<{ OPEN_SEA_API_KEY: string }>(c);

  // Parsing DID
  try {
    const parsedData = parseDID(assetDID);
    const assetData = await getAsset(
      parsedData.networkId,
      parsedData.assetId,
      parsedData.tokenId,
      OPEN_SEA_API_KEY
    );
    return c.json(assetData);
  } catch (e) {
    return c.json({ error: 'Asset not found' });
  }
});

export default app;
