import { Hono } from 'hono';
import { env } from 'hono/adapter';

import { getAsset } from '@sni/clients/assets-client';
import { DeepAsset } from '@sni/clients/assets-client/types';
import { parseDID } from '@sni/address-utils';
import { shuffle } from 'lodash';

const app = new Hono();

const collections = {
  sub0: {
    id: 'sub0',
    collectionAddress: 'did:asset:deep:polkadot.asset-hub:13',
    highlightIds: [1, 2, 3, 4, 734, 735, 736, 737],
  },
  soundwaves: {
    id: 'soundwaves',
    collectionAddress:
      'did:asset:eip155:42161.erc721:0x6cc7c9b2aa5fdcc044f9a51d9d083fd16aeb0a78',
    highlightIds: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  hh: {
    id: 'hh',
    collectionAddress: 'did:asset:deep:hotel-hideaway.asset',
    highlightIds: [
      'buffalo-horns',
      'hippopotamus-beanie',
      'zebra-onesie-hood',
      'upemba-mud-turtle-shell',
      'hippopotamus-beanie',
      'park-ranger-uniform',
      'zebra-mohawk',
      'upemba-mud-turtle-mask',
    ],
  },
};

async function fetchAssets(
  collectionAddress: string,
  tokenIds: number[] | string[],
  apiKey?: string
) {
  const shuffledIds = shuffle(tokenIds).slice(0, 3);

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
    default:
      return c.text('Collection not found', 404);
  }

  return c.json(assets);
});

export default app;
