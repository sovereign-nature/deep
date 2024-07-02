import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { getAssetByDID } from '@sni/clients/assets-client';
import { AddressParsingError } from '@sni/address-utils';
import { logger } from '../../utils/logger';

const app = new Hono();

app.get('/:assetDid', async (c) => {
  const { OPEN_SEA_API_KEY } = env<{ OPEN_SEA_API_KEY: string }>(c);
  const { ALCHEMY_API_KEY } = env<{ ALCHEMY_API_KEY: string }>(c);

  const assetDID = c.req.param('assetDid');

  try {
    const assetData = await getAssetByDID(assetDID, {
      openSeaAPIKey: OPEN_SEA_API_KEY,
      alchemyAPIKey: ALCHEMY_API_KEY,
    });
    return c.json(assetData);
  } catch (e) {
    logger.error(e);

    if (e instanceof AddressParsingError) {
      return c.json({ error: true, message: e.message }, 400);
    }

    if (e instanceof Error) {
      return c.json({ error: true, message: e.message }, 500);
    }

    //TODO: Check if axios is raising an error on 404
    return c.json({ error: true, message: 'Asset not found' }, 404);
  }
});

export default app;
