import { DEEP_ASSETS_GATEWAY } from '@sni/constants';
import { DeepAsset } from '@sni/types';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
  assets: ServiceWorkerGlobalScope;
};

const app = new Hono<{ Bindings: Bindings }>();
app.use('/*', cors());

app.get('/', (c) => c.text('DEEP Web3 Highlights'));

const collections = {
  sub0: {
    id: 'sub0',
    collectionAddress: 'did:asset:deep:polkadot.asset-hub:13',
    highlightIds: [1, 2, 3, 4, 734, 735, 736, 737],
  },
};

async function fetchAssets(
  collectionAddress: string,
  tokenIds: number[],
  serviceWorker: ServiceWorkerGlobalScope
) {
  const assets: DeepAsset[] = [];
  for await (const tokenId of tokenIds) {
    const url = `${DEEP_ASSETS_GATEWAY}/${collectionAddress}:${tokenId}`;
    //TODO: use local fetch in dev mode
    const response = await serviceWorker.fetch(url);
    const asset: DeepAsset = await response.json();
    assets.push(asset);
  }

  return assets;
}

app.get('/:collectionId', async (c) => {
  const collectionId = c.req.param('collectionId');

  console.log(c.env);
  console.log(c.env.assets);

  let assets: DeepAsset[];

  switch (collectionId) {
    case collections.sub0.id:
      assets = await fetchAssets(
        collections.sub0.collectionAddress,
        collections.sub0.highlightIds,
        c.env.assets
      );
      break;
    default:
      return c.text('Collection not found', 404);
  }

  return c.json(assets);
});

export default app;
