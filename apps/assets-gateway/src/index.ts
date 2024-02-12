import { getChainName, parseAddress } from '@sni/address-utils';
import {
  OpenSeaResponse,
  PolkadotResponse,
  getNftAsset,
  DirectusAsset,
  getHotelHideawayAsset,
} from '@sni/clients/assets-client';
import { SNI_DIRECTUS_URL } from '@sni/constants';
import { DeepAsset } from '@sni/types';
import { Hono } from 'hono';
import { env } from 'hono/adapter';
const app = new Hono();

export interface Env {
  OPEN_SEA_API_KEY: string;
}

app.get('/', (c) => c.text('DEEP Assets Gateway'));

function getNetworkId(chainNamespace: string, chainId: string): string {
  switch (chainNamespace) {
    case 'eip155':
      return getChainName(parseInt(chainId));
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

  const { OPEN_SEA_API_KEY } = env<{ OPEN_SEA_API_KEY: string }>(c);

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
    const assetData = await getAsset(
      networkId,
      assetId,
      tokenId,
      OPEN_SEA_API_KEY
    );
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

  const fullImageUrl = `${SNI_DIRECTUS_URL}/assets/${data.image}`; //TODO: Remove this for now, it breaks flow on front-end
  data.image = fullImageUrl;

  return { ...data, tokenId: data.id };
}

async function getAsset(
  networkId: string,
  assetId: string,
  tokenId: number,
  apiKey?: string
): Promise<DeepAsset> {
  switch (networkId) {
    case 'polkadot':
    case 'kusama':
      return polkadotFormatter(
        (await getNftAsset(networkId, assetId, tokenId)) as PolkadotResponse
      );
    case 'sepolia':
    case 'arbitrum':
      return openSeaFormatter(
        (await getNftAsset(
          networkId,
          assetId,
          tokenId,
          apiKey
        )) as OpenSeaResponse
      );
    case 'hotel-hideaway':
      return directusFormatter(await getHotelHideawayAsset(assetId));
    default:
      throw new Error(`Unknown networkId: ${networkId}`);
  }
}

export default app;
