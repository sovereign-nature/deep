import { parseAddress } from '@sni/address-utils';
import {
  OpenSeaResponse,
  PolkadotResponse,
  getNftAsset,
} from '@sni/clients/nft';
import { DirectusAsset, getHotelHideawayAsset } from '@sni/clients/web2';
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
  let networkId: string;
  let tokenId: number;
  let assetId: string;

  // Parsing DID
  try {
    const { chain, asset } = parseAddress(assetDID);
    networkId = getNetworkId(chain.namespace, chain.reference);
    assetId = asset.reference;
    tokenId = asset.identifier;
  } catch (e) {
    return c.json({ error: 'Invalid DID' });
  }

  // Getting asset data
  try {
    const assetData = await getAsset(networkId, assetId, tokenId);
    return c.json(assetData);
  } catch (e) {
    return c.json({ error: 'Asset not found' });
  }
});

function polkadotFormatter(assetData: PolkadotResponse): DeepAsset {
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

function openSeaFormatter(assetData: OpenSeaResponse): DeepAsset {
  return {
    id: assetData.nft.identifier,
    tokenId: assetData.nft.identifier,
    name: assetData.nft.name,
    description: assetData.nft.description,
    image: assetData.nft.image_url, //TODO: Use asset_contract.image_url instead?
    collection: {
      id: assetData.collection.collection,
      name: assetData.collection.name,
    },
  };
}

function directusFormatter(assetData: DirectusAsset): DeepAsset {
  const data = assetData.data;

  const fullImageUrl = `${SNI_API_URL}/assets/${data.image}`;
  data.image = fullImageUrl;

  return { ...data, tokenId: data.id };
}

async function getAsset(
  networkId: string,
  assetId: string,
  tokenId: number
): Promise<DeepAsset> {
  switch (networkId) {
    case 'polkadot':
    case 'kusama':
      return polkadotFormatter(
        (await getNftAsset(networkId, assetId, tokenId)) as PolkadotResponse
      );
    case 'sepolia':
      return openSeaFormatter(
        (await getNftAsset(networkId, assetId, tokenId)) as OpenSeaResponse
      );
    case 'hotel-hideaway':
      return directusFormatter(await getHotelHideawayAsset(assetId));
    default:
      throw new Error(`Unknown networkId: ${networkId}`);
  }
}

export default app;
