import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { DeepAsset } from '@sni/types';
import _ from 'lodash';
import { getAssetByDID } from '@sni/clients/assets-client';
import { collections } from './config';

const app = new Hono();

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

  const { OPEN_SEA_API_KEY } = env<{ OPEN_SEA_API_KEY: string }>(c);
  const { ALCHEMY_API_KEY } = env<{ ALCHEMY_API_KEY: string }>(c);

  const keys = {
    openSeaAPIKey: OPEN_SEA_API_KEY,
    alchemyAPIKey: ALCHEMY_API_KEY,
  };

  if (!collections[collectionId]) {
    return c.json({ error: true, message: 'Invalid collection' }, 400);
  }

  const currentCollection = collections[collectionId];

  let assets: DeepAsset[];

  try {
    assets = await fetchAssets(
      currentCollection.collectionAddress,
      currentCollection.highlightIds,
      keys
    );
  } catch (error) {
    console.error(error);
    return c.json({ error: true, message: 'Internal server error' }, 500);
  }

  return c.json(assets);
});

export default app;
