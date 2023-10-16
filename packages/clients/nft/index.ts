import { GraphQLClient } from 'graphql-request';

import { getNftById } from './queries/polkadot';

const POLKADOT_NFT_API = 'https://squid.subsquid.io/speck/graphql';
const KUSAMA_NFT_API = 'https://squid.subsquid.io/stick/graphql';

const polkadotClient = new GraphQLClient(POLKADOT_NFT_API, { fetch });
const kusamaClient = new GraphQLClient(KUSAMA_NFT_API, { fetch });

export function getPolkadotNft(id: string) {
  return polkadotClient.request(getNftById, {
    id,
  });
}

export function getKusamaNft(id: string) {
  return kusamaClient.request(getNftById, {
    id,
  });
}

export function getNftData(
  network: string,
  collectionAddress: string,
  tokenId: number
) {
  switch (network) {
    case 'polkadot':
      return getPolkadotNft(`${collectionAddress}-${tokenId}`);
    case 'kusama':
      return getKusamaNft(`${collectionAddress}-${tokenId}`);
  }
}
