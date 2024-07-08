import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { AssetNotFoundError, getAssetByDID } from '@sni/clients/assets-client';
import { AddressParsingError, parseAssetDID } from '@sni/address-utils';
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

    const { network, contractAddress } = parseAssetDID(assetDID);

    if (
      ['unique', 'opal'].includes(network) &&
      ['3019'].includes(contractAddress)
    ) {
      return c.json({
        ...assetData,
        multipass: {
          name: 'DOTphin',
          infoLink: 'https://sovereignnature.com/',
        },
      });
    }

    return c.json(assetData);
  } catch (e) {
    logger.error(e);

    if (e instanceof AddressParsingError) {
      return c.json({ error: true, message: e.message }, 400);
    }

    if (e instanceof AssetNotFoundError) {
      return c.json({ error: true, message: e.message }, 404);
    }

    if (e instanceof Error) {
      return c.json({ error: true, message: e.message }, 500);
    }
  }
});

export default app;
