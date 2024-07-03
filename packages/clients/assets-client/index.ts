import { DeepAsset } from '@sni/types';
import { parseAssetDID } from '@sni/address-utils';
import { getHotelHideawayAsset } from './targets/directus/client';
import { getKusamaAsset, getPolkadotAsset } from './targets/polkadot/client';
import { getMoonsamaAsset } from './targets/moonsama/client';
import { getOpenSeaAsset } from './targets/opensea/client';
import { getOptimismTestnetAsset as getOptimismAsset } from './targets/alchemy/client';

//TODO: Cover with tests
async function getAsset(
  network: string,
  collectionId: string, //TODO: Better naming, so it illustrates contract address or Web2 asset ID
  tokenId: number,
  keys?: KeysConfig
): Promise<DeepAsset> {
  switch (network) {
    case 'polkadot':
      return getPolkadotAsset(collectionId, tokenId);
    case 'kusama':
      return getKusamaAsset(collectionId, tokenId);
    case 'moonsama':
      return getMoonsamaAsset(collectionId, tokenId);
    case 'sepolia':
    case 'arbitrum':
      return getOpenSeaAsset(
        collectionId,
        tokenId,
        network,
        keys?.openSeaAPIKey
      );
    case 'optimism-sepolia':
      return getOptimismAsset(
        collectionId,
        tokenId,
        keys?.alchemyAPIKey || '',
        true //testnet
      );
    case 'optimism':
      return getOptimismAsset(
        collectionId,
        tokenId,
        keys?.alchemyAPIKey || '',
        false //mainnet
      );
    case 'hotel-hideaway':
      return getHotelHideawayAsset(collectionId);
    default:
      throw new Error(`Unknown networkId: ${network}`);
  }
}

type KeysConfig = {
  openSeaAPIKey?: string;
  alchemyAPIKey?: string;
};

export class AssetNotFoundError extends Error {
  constructor() {
    super('Asset not found');
    this.name = 'AssetNotFoundError';
  }
}

export async function getAssetByDID(did: string, keys?: KeysConfig) {
  const parsedData = parseAssetDID(did);

  //TODO: Add error handling here
  return await getAsset(
    parsedData.network,
    parsedData.contractAddress,
    parsedData.tokenId,
    keys
  );
}
