import { ethers } from 'ethers';

export function stringToId(input: string): string {
  const hash = ethers.keccak256(ethers.toUtf8Bytes(input));

  return BigInt(hash).toString();
}

export function getOffChainAssetId(
  vendorId: string,
  assetName: string
): string {
  //standard:vendorId.assetType:assetID
  //deep:hh.asset:african-elephant-mask

  const assetAddress = `deep:${vendorId}.asset:${assetName
    .toLowerCase()
    .replace(' ', '-')}`;

  return stringToId(assetAddress);
}

export function getEVMAssetId(
  chainId: number,
  tokenStandard: string,
  contractAddress: string,
  tokenId: number
): string {
  //'eip155:1.erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:634446'

  const assetAddress = `eip155:${chainId}.${tokenStandard}:${contractAddress}:${tokenId}`;

  return stringToId(assetAddress);
}

export function getPolkadotAssetId(
  chainId: string,
  collectionId: string,
  tokenId: number
): string {
  //deep:kusama.asset-hub:91:10

  const assetAddress = `deep:${chainId}.asset-hub:${collectionId}:${tokenId}`;

  return stringToId(assetAddress);
}
