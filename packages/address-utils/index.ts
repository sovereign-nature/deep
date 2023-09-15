import { ethers } from 'ethers';

export function stringToId(input: string): string {
  const hash = ethers.keccak256(ethers.toUtf8Bytes(input));

  return BigInt(hash).toString();
}

//standard:vendorId.assetType:assetID
//deep:hh.asset:african-elephant-mask
export function getOffChainAssetAddress(
  vendorId: string,
  assetName: string
): string {
  return `deep:${vendorId}.asset:${assetName.toLowerCase().replace(' ', '-')}`;
}

export function getOffChainAssetId(
  vendorId: string,
  assetName: string
): string {
  return stringToId(getOffChainAssetAddress(vendorId, assetName));
}

//'eip155:1.erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:634446'
export function getEVMAssetAddress(
  chainId: number,
  tokenStandard: string,
  contractAddress: string,
  tokenId: number
) {
  return `eip155:${chainId}.${tokenStandard}:${contractAddress}:${tokenId}`;
}

export function getEVMAssetId(
  chainId: number,
  tokenStandard: string,
  contractAddress: string,
  tokenId: number
): string {
  return stringToId(
    getEVMAssetAddress(chainId, tokenStandard, contractAddress, tokenId)
  );
}

//deep:kusama.asset-hub:91:10
export function getPolkadotAssetHubAddress(
  chainId: string,
  collectionId: string,
  tokenId: number
) {
  return `deep:${chainId}.asset-hub:${collectionId}:${tokenId}`;
}
export function getPolkadotAssetId(
  chainId: string,
  collectionId: string,
  tokenId: number
): string {
  return stringToId(getPolkadotAssetHubAddress(chainId, collectionId, tokenId));
}
