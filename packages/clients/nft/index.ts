import { GraphQLClient } from 'graphql-request';

import { getNftById } from './queries/polkadot';

const POLKADOT_NFT_API = 'https://squid.subsquid.io/speck/graphql';
const KUSAMA_NFT_API = 'https://squid.subsquid.io/stick/graphql';

export type PolkadotResponse = {
  nftEntity: {
    id: string;
    sn: string;
    meta: {
      name: string;
      description: string;
      image: string;
    };
    collection: {
      id: string;
      name: string;
    };
  };
};

export type OpenSeaNFTResponse = {
  nft: {
    identifier: string;
    name: string;
    description: string;
    image_url: string;
  };
};

export type OpenSeaCollectionResponse = {
  collection: string;
  name: string;
};

export type OpenSeaResponse = OpenSeaNFTResponse & {
  collection: OpenSeaCollectionResponse;
};

const polkadotClient = new GraphQLClient(POLKADOT_NFT_API, { fetch });
const kusamaClient = new GraphQLClient(KUSAMA_NFT_API, { fetch });

export function getPolkadotNft(id: string) {
  return polkadotClient.request<PolkadotResponse>(getNftById, {
    id,
  });
}

export function getKusamaNft(id: string) {
  return kusamaClient.request<PolkadotResponse>(getNftById, {
    id,
  });
}

export async function getOpenSeaNft(
  contractAddress: string,
  tokenId: number,
  network: string,
  apiKey?: string
) {
  const testnetPrefix = network === 'sepolia' ? 'testnets-' : '';

  const apiURL = `https://${testnetPrefix}api.opensea.io/api/v2/chain/${network}`;

  //TODO: Rename OPEN_SEA to OPENSEA
  //TODO: Unify client and server clients
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

export function getNftAsset(
  network: string,
  contractAddress: string,
  tokenId: number,
  apiKey?: string
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
      return getOpenSeaNft(contractAddress, tokenId, network, apiKey);
    default:
      throw new Error(`Unknown network: ${network}`);
  }
}
