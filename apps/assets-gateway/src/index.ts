import { parseAddress } from '@sni/address-utils';
import { getNftData } from '@sni/clients/nft';
import { getHotelHideawayAsset } from '@sni/clients/web2';
import { SNI_API_URL } from '@sni/constants';
import { DeepAsset } from '@sni/types';
import { Hono } from 'hono';
const app = new Hono();

app.get('/', (c) => c.text('DEEP Assets Gateway'));

// TODO: Move methods to library, cover with tests
function eip155ToName(chainId: number): string {
  switch (chainId) {
    case 1:
      return 'ethereum';
    case 11155111:
      return 'sepolia';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
}

function getNetworkId(chainNamespace: string, chainId: string): string {
  switch (chainNamespace) {
    case 'eip155':
      return eip155ToName(parseInt(chainId));
    case 'deep':
      return chainId;
    default:
      throw new Error(`Unknown namespace: ${chainNamespace}`);
  }
}

app.get('/:assetDID', async (c) => {
  const assetDID = c.req.param('assetDID');

  const { chain, asset } = parseAddress(assetDID);

  //TODO: Handle unknown chains
  const networkId = getNetworkId(chain.namespace, chain.reference);

  const assetId = asset.reference;
  const tokenId = asset.identifier;

  const assetData = await getAsset(networkId, assetId, tokenId);

  return c.json(assetData);
});

//TODO: Proper typing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function polkadotFormatter(assetData: any): DeepAsset {
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
function openSeaFormatter(assetData: any): DeepAsset {
  //TODO: Proper typing for formatted data and assetData
  return {
    id: assetData.id,
    tokenId: assetData.token_id,
    name: assetData.name,
    description: assetData.description,
    image: assetData.image_original_url, //TODO: Use asset_contract.image_url instead?
    collection: {
      id: assetData.collection.slug,
      name: assetData.collection.name,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function directusFormatter(assetData: any): DeepAsset {
  //TODO: Proper typing for data
  const data = assetData.data;

  const fullImageUrl = `${SNI_API_URL}/assets/${data.image}`;
  data.image = fullImageUrl;

  return data;
}

async function getAsset(
  networkId: string,
  assetId: string,
  tokenId: number
): Promise<DeepAsset> {
  switch (networkId) {
    case 'polkadot':
    case 'kusama':
      return polkadotFormatter(await getNftData(networkId, assetId, tokenId));
    case 'sepolia':
      return openSeaFormatter(await getNftData(networkId, assetId, tokenId));
    case 'hotel-hideaway':
      //TODO: Proper typing
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return directusFormatter(
        await (await getHotelHideawayAsset(assetId)).json()
      );
    default:
      throw new Error(`Unknown networkId: ${networkId}`);
  }
}

export default app;
