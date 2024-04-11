import { keccak256, stringToBytes } from 'viem';

//Off chain address example
//did:asset:standard:vendorId.assetType:assetID
//did:asset:deep:hh.asset:african-elephant-mask

//EVM address example
//'did:asset:eip155:1.erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:634446'

//Polkadot address example
//did:asset:deep:kusama.asset-hub:91:10

//Hashing did address to numeric id like it's done in ENS
export function stringToId(input: string): string {
  const hash = keccak256(stringToBytes(input.toLowerCase()));

  return BigInt(hash).toString();
}

//Resolving address to it's components according to the AssetDID standard
//TODO: Rename to resolveAddress, make internal
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
  optimism: 10,
  'optimism-sepolia': 11155420,
};

export function getChainId(chainName: string): number {
  if (typeof chainName === 'string') {
    return chainNameToId[chainName.toLowerCase()] || 0;
  }
  return 0; //TODO: Throw an error?
}

export function chainIdToName(chainId: number): string {
  const idToChainName: { [key: number]: string } = {};

  // Reverse the chainNameToId mapping
  for (const chainName in chainNameToId) {
    const id = chainNameToId[chainName];
    idToChainName[id] = chainName;
  }

  return idToChainName[chainId] || ''; //TODO: Throw an error?
}

//Resolving chain name from it's namespace and ID
function getChainName(chainNamespace: string, chainId: string): string {
  switch (chainNamespace) {
    case 'eip155':
      return chainIdToName(parseInt(chainId));
    case 'deep':
      return chainId;
    default:
      throw new Error(`Unknown namespace: ${chainNamespace}`);
  }
}

//Parsing AssetDID to it's components
export function parseAssetDID(did: string) {
  const { chain, asset } = parseAddress(did);
  const network = getChainName(chain.namespace, chain.reference);
  const contractAddress = asset.reference;
  const tokenId = asset.identifier;

  return { network, contractAddress, tokenId };
}
