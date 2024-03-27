import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { DeepAsset } from '@sni/clients/assets-client/types';
import { parseDID } from '@sni/address-utils';
import _ from 'lodash';
import { getAsset } from '../../shared';
import { collections } from './config';

const app = new Hono();

async function fetchAssets(
  collectionAddress: string,
  tokenIds: number[] | string[],
  apiKey?: string
) {
  const shuffledIds = _.shuffle(tokenIds).slice(0, 3);

  const fetchedAssets: DeepAsset[] = [];
  for await (const tokenId of shuffledIds) {
    const assetDID = `${collectionAddress}:${tokenId}`;

    const parsed = parseDID(assetDID);

    const asset = await getAsset(
      parsed.networkId,
      parsed.assetId,
      parsed.tokenId,
      apiKey
    );

    asset.address = `${collectionAddress}:${tokenId}`;
    fetchedAssets.push(asset);
  }

  return fetchedAssets;
}

app.get('/:collectionId', async (c) => {
  const collectionId = c.req.param('collectionId');

  const { OPEN_SEA_API_KEY } = env<{ OPEN_SEA_API_KEY: string }>(c);

  let assets: DeepAsset[];

  switch (collectionId) {
    case collections.sub0.id:
      assets = await fetchAssets(
        collections.sub0.collectionAddress,
        collections.sub0.highlightIds
      );
      break;
    case collections.soundwaves.id:
      assets = await fetchAssets(
        collections.soundwaves.collectionAddress,
        collections.soundwaves.highlightIds,
        OPEN_SEA_API_KEY
      );
      break;
    case collections.hh.id:
      assets = await fetchAssets(
        collections.hh.collectionAddress,
        collections.hh.highlightIds
      );
      break;
    case collections.wildsama.id:
      assets = await fetchAssets(
        collections.wildsama.collectionAddress,
        collections.wildsama.highlightIds
      );
      break;
    default:
      return c.json({ error: true, message: 'Invalid collection' }, 400);
  }

  return c.json(assets);
});

export default app;
