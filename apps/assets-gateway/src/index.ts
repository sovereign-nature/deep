import { getKusamaNft, getPolkadotNft } from '@sni/clients/nft';
import { Hono } from 'hono';
const app = new Hono();

app.get('/', (c) => c.text('Hello Cloudflare Workers!'));

app.get('/:networkId/:assetId', async (c) => {
  const assetId = c.req.param('assetId');
  const networkId = c.req.param('networkId');
  const assetData = await getAssetId(networkId, assetId);

  return c.json(assetData);
});

function getAssetId(networkId: string, assetId: string) {
  switch (networkId) {
    case 'polkadot':
      return getPolkadotNft(assetId);
    case 'kusama':
      return getKusamaNft(assetId);
  }
}

export default app;
