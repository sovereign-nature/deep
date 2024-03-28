import { keccak256, stringToBytes } from 'viem';

export function stringToId(input: string): string {
  const hash = keccak256(stringToBytes(input.toLowerCase()));

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

type ChainNameToId = {
  [key: string]: number;
};

const chainNameToId: ChainNameToId = {
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  sepolia: 11155111,
  polygon: 137,
  'polygon-sepolia': 137111,
  mumbai: 80001,
  arbitrum: 42161,
  'arbitrum-sepolia': 421611,
  moonsama: 2199,
};

export function getChainId(chainName: string): number {
  if (typeof chainName === 'string') {
    return chainNameToId[chainName.toLowerCase()] || 0;
  }
  return 0;
}

//TODO: Rename to chainIdToName
export function getChainName(chainId: number): string {
  const idToChainName: { [key: number]: string } = {};

  // Reverse the chainNameToId mapping
  for (const chainName in chainNameToId) {
    const id = chainNameToId[chainName];
    idToChainName[id] = chainName;
  }

  return idToChainName[chainId] || '';
}

//TODO: Rename to getChainName
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

//TODO: There is a confusion between parseAddress and parseDID
export function parseDID(did: string) {
  const { chain, asset } = parseAddress(did);
  const networkId = getNetworkId(chain.namespace, chain.reference);
  const assetId = asset.reference;
  const tokenId = asset.identifier;

  return { networkId, assetId, tokenId };
}

export function getCollectionFromAddress(did: string): string {
  const parts = did.split(':');
  return parts[parts.length - 1];
}
