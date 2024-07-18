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
  unique: 8880,
  quartz: 8881,
  opal: 8882,
};

export class ChainParsingError extends Error {}
//TODO: Rename to chainNameToEIP155Id
export function getChainId(chainName: string): number {
  try {
    return chainNameToId[chainName.toLowerCase()];
  } catch (e) {
    throw new ChainParsingError(`Unknown chain name: ${chainName}`);
  }
}

//TODO: Make internal
export function chainIdToName(chainId: number): string {
  const idToChainName: { [key: number]: string } = {};

  // Reverse the chainNameToId mapping
  for (const chainName in chainNameToId) {
    const id = chainNameToId[chainName];
    idToChainName[id] = chainName;
  }

  try {
    return idToChainName[chainId];
  } catch (e) {
    throw new ChainParsingError(`Unknown chain id: ${chainId}`);
  }
}

//TODO: Use this function insead of chainIdToName
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

//Resolving address to it's components according to the AssetDID standard
//TODO: Make internal
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
      identifier: tokenId ? Number(tokenId) : -1,
    },
  };
}

export class AddressParsingError extends Error {}
//Parsing AssetDID to it's components
export function parseAssetDID(did: string) {
  try {
    const { chain, asset } = parseAddress(did);
    const network = getChainName(chain.namespace, chain.reference);

    const contractAddress = asset.reference;
    if (!contractAddress) {
      throw new AddressParsingError('Contract address is missing');
    }

    const tokenId = asset.identifier;
    if (isNaN(tokenId)) {
      throw new AddressParsingError('Invalid token id');
    }

    return { network, contractAddress, tokenId };
  } catch (e) {
    if (e instanceof AddressParsingError) {
      throw e;
    }

    throw new AddressParsingError(`Invalid DID address: ${did}`);
  }
}

export type TokenStandard = 'erc721' | 'erc1155' | 'unique2';
export function createAssetDID(
  chainName: string,
  contractStandard: TokenStandard,
  contractAddress: string | number,
  tokenId: number | string
) {
  const chainId = getChainId(chainName);
  return `did:asset:eip155:${chainId}.${contractStandard}:${contractAddress}:${tokenId}`;
}
