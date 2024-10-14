import { Hono } from 'hono';
import { AssetNotFoundError, getAssetByDID } from '@sni/clients/assets-client';
import { AddressParsingError, parseAssetDID } from '@sni/address-utils';
import { logger } from '$lib/logger';
import { AppContext } from '$lib/shared/types';

const app = new Hono<AppContext>();

app.get('/:assetDid', async (c) => {
  const assetDID = c.req.param('assetDid');

  try {
    const assetData = await getAssetByDID(assetDID, {
      openSeaAPIKey: c.env.OPEN_SEA_API_KEY,
      alchemyAPIKey: c.env.ALCHEMY_API_KEY,
    });

    //TODO: This is a hack, need to stabilize on API level
    const { network, contractAddress } = parseAssetDID(assetDID);

    if (
      ['unique', 'opal'].includes(network) &&
      ['3019', '3030', '665'].includes(contractAddress)
    ) {
      return c.json({
        ...assetData,
        multipass: {
          name: 'DOTphin',
          infoLink: 'https://sovereignnature.com/dotphin',
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
