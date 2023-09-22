import request from 'graphql-request';
import { getNftById } from './queries/polkadot';

const POLKADOT_NFT_API = 'https://squid.subsquid.io/speck/v/v3/graphql';
const KUSAMA_NFT_API = 'https://squid.subsquid.io/stick/graphql';

function getPolkadotNft(id: string) {
  return request(POLKADOT_NFT_API, getNftById, {
    id,
  });
}

function getKusamaNft(id: string) {
  return request(KUSAMA_NFT_API, getNftById, {
    id,
  });
}

export function getNftData(
  network: string,
  collectionAddress: string,
  tokenId: string
) {
  switch (network) {
    case 'polkadot':
      return getPolkadotNft(`${collectionAddress}-${tokenId}`);
    case 'kusama':
      return getKusamaNft(`${collectionAddress}-${tokenId}`);
  }
}
