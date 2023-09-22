import request from 'graphql-request';
import { getNftById } from './queries/polkadot';

const POLKADOT_NFT_API = 'https://squid.subsquid.io/speck/v/v3/graphql';
const KUSAMA_NFT_API = 'https://squid.subsquid.io/stick/graphql';

function getPolkadotNFT(id: string) {
  return request(POLKADOT_NFT_API, getNftById, {
    id,
  });
}

function getKusamaNFT(id: string) {
  return request(KUSAMA_NFT_API, getNftById, {
    id,
  });
}

export function getNFTData(
  network: string,
  collectionAddress: string,
  tokenId: string
) {
  switch (network) {
    case 'polkadot':
      return getPolkadotNFT(`${collectionAddress}-${tokenId}`);
    case 'kusama':
      return getKusamaNFT(`${collectionAddress}-${tokenId}`);
  }
}
