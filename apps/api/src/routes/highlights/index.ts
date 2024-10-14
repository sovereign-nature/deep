import { Hono } from 'hono';
import { DeepAsset } from '@sni/types';
import _ from 'lodash';
import { getAssetByDID } from '@sni/clients/assets-client';
import { collections } from './config';
import { AppContext } from '$lib/shared/types';

const app = new Hono<AppContext>();

//TODO: Move to clients/assets-client
async function fetchAssets(
  collectionAddress: string,
  tokenIds: number[] | string[],
  keysConfig?: { openSeaAPIKey?: string; alchemyAPIKey?: string } //TODO: Replace type
) {
  const shuffledIds = _.shuffle(tokenIds).slice(0, 3);

  const fetchedAssets: DeepAsset[] = [];
  for await (const tokenId of shuffledIds) {
    const assetDID = `${collectionAddress}:${tokenId}`;

    const asset = await getAssetByDID(assetDID, keysConfig);
    asset.address = assetDID;

    fetchedAssets.push(asset);
  }

  return fetchedAssets;
}

app.get('/:collectionId', async (c) => {
  const collectionId = c.req.param('collectionId');

  if (!collections[collectionId]) {
    return c.json({ error: true, message: 'Invalid collection' }, 400);
  }

  const currentCollection = collections[collectionId];

  let assets: DeepAsset[];

  try {
    assets = await fetchAssets(
      currentCollection.collectionAddress,
      currentCollection.highlightIds,
      {
        openSeaAPIKey: c.env.OPEN_SEA_API_KEY,
        alchemyAPIKey: c.env.ALCHEMY_API_KEY,
      }
    );
  } catch (error) {
    console.error(error);
    return c.json({ error: true, message: 'Internal server error' }, 500);
  }

  return c.json(assets);
});

export default app;
