import { GraphQLClient } from 'graphql-request';
import { kusamaApiUrl, polkadotApiUrl, directusUrl } from '../config';
import { getNftById } from './queries/polkadot';
import {
  PolkadotResponse,
  OpenSeaResponse,
  OpenSeaCollectionResponse,
  DirectusAsset,
  DeepAsset,
} from './types';

import {
  directusFormatter,
  openSeaFormatter,
  polkadotFormatter,
} from './formatters';

const polkadotClient = new GraphQLClient(polkadotApiUrl, { fetch });
const kusamaClient = new GraphQLClient(kusamaApiUrl, { fetch });

function getPolkadotNft(id: string) {
  return polkadotClient.request<PolkadotResponse>(getNftById, {
    id,
  });
}

function getKusamaNft(id: string) {
  return kusamaClient.request<PolkadotResponse>(getNftById, {
    id,
  });
}

async function getOpenSeaNft(
  contractAddress: string,
  tokenId: number,
  network: string,
  apiKey?: string
) {
  const testnetPrefix = network === 'sepolia' ? 'testnets-' : '';

  const apiURL = `https://${testnetPrefix}api.opensea.io/api/v2/chain/${network}`;

  const headers = {
    'X-API-KEY': apiKey ? apiKey : '',
    Accept: 'application/json',
  };

  const nftRes = await fetch(
    `${apiURL}/contract/${contractAddress}/nfts/${tokenId}`,
    { headers }
  );

  const nftData: OpenSeaResponse = await nftRes.json();

  const collectionRes = await fetch(`${apiURL}/contract/${contractAddress}`, {
    headers,
  });

  const collectionData: OpenSeaCollectionResponse = await collectionRes.json();

  nftData.collection = collectionData;

  return nftData;
}

function getNftAsset(
  network: string,
  contractAddress: string,
  tokenId: number,
  openSeaApiKey?: string
) {
  switch (network) {
    case 'polkadot':
      return getPolkadotNft(`${contractAddress}-${tokenId}`);
    case 'kusama':
      return getKusamaNft(`${contractAddress}-${tokenId}`);
    case 'sepolia':
    case 'arbitrum':
    case 'polygon':
    case 'optimism':
      return getOpenSeaNft(contractAddress, tokenId, network, openSeaApiKey);
    default:
      throw new Error(`Unknown network: ${network}`);
  }
}

async function getHotelHideawayAsset(id: string) {
  const web2Res = await fetch(
    `${directusUrl}/items/hotel_hideaway/${id}?fields=*,collection.*`
  );

  return (await web2Res.json()) as DirectusAsset;
}

//TODO: Cover with tests
export async function getAsset(
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
