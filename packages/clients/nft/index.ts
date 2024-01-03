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

export async function getOpenSeaTestNetNft(
  contractAddress: string,
  tokenId: number
) {
  const nftRes = await fetch(
    `https://testnets-api.opensea.io/api/v2/chain/sepolia/contract/${contractAddress}/nfts/${tokenId}`
  );

  const nftData: OpenSeaResponse = await nftRes.json();

  const collectionRes = await fetch(
    `https://testnets-api.opensea.io/api/v2/chain/sepolia/contract/${contractAddress}`
  );

  const collectionData: OpenSeaCollectionResponse = await collectionRes.json();

  nftData.collection = collectionData;

  return nftData;
}

export function getNftAsset(
  network: string,
  contractAddress: string,
  tokenId: number
) {
  switch (network) {
    case 'polkadot':
      return getPolkadotNft(`${contractAddress}-${tokenId}`);
    case 'kusama':
      return getKusamaNft(`${contractAddress}-${tokenId}`);
    case 'sepolia':
      return getOpenSeaTestNetNft(contractAddress, tokenId);
    default:
      throw new Error(`Unknown network: ${network}`);
  }
}
