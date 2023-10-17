import { parseAddress } from '@sni/address-utils';
import { getNftData } from '@sni/clients/nft';
import { getHotelHideawayAsset } from '@sni/clients/web2';
import { SNI_API_URL } from '@sni/constants';
import { Hono } from 'hono';
const app = new Hono();

app.get('/', (c) => c.text('DEEP Assets Gateway'));

app.get('/:assetDID', async (c) => {
  const assetDID = c.req.param('assetDID');

  const { chain, asset } = parseAddress(assetDID);

  const networkId = chain.reference;

  const assetId = asset.reference;
  const tokenId = asset.identifier;

  const assetData = await getAsset(networkId, assetId, tokenId);

  return c.json(assetData);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function polkadotFormatter(assetData: any) {
  const nftEntity = assetData.nftEntity;
  return {
    id: nftEntity.id,
    tokenId: nftEntity.sn,
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

  return data;
}

async function getAsset(networkId: string, assetId: string, tokenId: number) {
  switch (networkId) {
    case 'polkadot':
    case 'kusama':
      return polkadotFormatter(await getNftData(networkId, assetId, tokenId));
    case 'hotel-hideaway':
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return directusFormatter(
        await (await getHotelHideawayAsset(assetId)).json()
      );
  }
}

export default app;
