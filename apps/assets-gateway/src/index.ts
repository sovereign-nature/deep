import { getKusamaNft, getPolkadotNft } from '@sni/clients/nft';
import { getHotelHideawayAsset } from '@sni/clients/web2';
import { SNI_API_URL } from '@sni/constants';
import { Hono } from 'hono';
const app = new Hono();

app.get('/', (c) => c.text('Hello Cloudflare Workers!'));

app.get('/:networkId/:assetId', async (c) => {
  const assetId = c.req.param('assetId');
  const networkId = c.req.param('networkId');
  const assetData = await getAsset(networkId, assetId);

  return c.json(assetData);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function polkadotFormatter(assetData: any) {
  const nftEntity = assetData.nftEntity;
  return {
    id: nftEntity.id,
    name: nftEntity.meta.name,
    description: nftEntity.meta.description,
    image: nftEntity.meta.image,
    collection: {
      id: nftEntity.collection.id,
      name: nftEntity.collection.name,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function directusFormatter(assetData: any) {
  const data = assetData.data;

  const fullImageUrl = `${SNI_API_URL}/assets/${data.image}`;
  data.image = fullImageUrl;

  data.collection = { name: 'SNI x Upemba National Park' };

  return data;
}

async function getAsset(networkId: string, assetId: string) {
  switch (networkId) {
    case 'polkadot':
      return polkadotFormatter(await getPolkadotNft(assetId));
    case 'kusama':
      return polkadotFormatter(await getKusamaNft(assetId));
    case 'hotel-hideaway':
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return directusFormatter(
        await (await getHotelHideawayAsset(assetId)).json()
      );
  }
}

export default app;
