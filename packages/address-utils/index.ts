import { ethers } from 'ethers';

export function stringToId(input: string): string {
  const hash = ethers.keccak256(ethers.toUtf8Bytes(input.toLowerCase()));

  return BigInt(hash).toString();
}

//did:asset:deep:hh.asset:african-elephant-mask
export function parseAddress(address: string) {
  const [prefix, assetAddress] = address.split('.');

  const [scheme, didMethod, chainNamespace, chainReference] = prefix.split(':');

  const [assetNamespace, assetReference, tokenId] = assetAddress.split(':');

  return {
    scheme,
    didMethod,
    chain: {
      namespace: chainNamespace,
      reference: chainReference,
    },
    asset: {
      namespace: assetNamespace,
      reference: assetReference,
      identifier: Number(tokenId),
    },
  };
}

//did:asset:standard:vendorId.assetType:assetID
//did:asset:deep:hh.asset:african-elephant-mask
export function getOffChainAssetAddress(
  vendorId: string,
  assetName: string
): string {
  return `did:asset:deep:${vendorId}.asset:${assetName
    .toLowerCase()
    .replace(' ', '-')}`;
}

export function getOffChainAssetId(
  vendorId: string,
  assetName: string
): string {
  return stringToId(getOffChainAssetAddress(vendorId, assetName));
}

//'did:asset:eip155:1.erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:634446'
export function getEVMAssetAddress(
  chainId: number,
  tokenStandard: string,
  contractAddress: string,
  tokenId: number
) {
  return `did:asset:eip155:${chainId}.${tokenStandard}:${contractAddress}:${tokenId}`;
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

//did:asset:deep:kusama.asset-hub:91:10
export function getPolkadotAssetHubAddress(
  chainId: string,
  collectionId: string,
  tokenId: number
) {
  return `did:asset:deep:${chainId}.asset-hub:${collectionId}:${tokenId}`;
}
export function getPolkadotAssetId(
  chainId: string,
  collectionId: string,
  tokenId: number
): string {
  return stringToId(getPolkadotAssetHubAddress(chainId, collectionId, tokenId));
}
