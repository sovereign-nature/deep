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
  assetId: string, //TODO: Better naming, so it illustrates contract address or Web2 asset ID
  tokenId: number,
  keys?: KeysConfig
): Promise<DeepAsset> {
  switch (network) {
    case 'polkadot':
      return getPolkadotAsset(assetId, tokenId);
    case 'kusama':
      return getKusamaAsset(assetId, tokenId);
    case 'moonsama':
      return getMoonsamaAsset(assetId, tokenId);
    case 'sepolia':
    case 'arbitrum':
      return getOpenSeaAsset(assetId, tokenId, network, keys?.openSeaAPIKey);
    case 'optimism-sepolia':
      return getOptimismAsset(
        assetId,
        tokenId,
        keys?.alchemyAPIKey || '',
        true
      );
    case 'hotel-hideaway':
      return getHotelHideawayAsset(assetId);
    default:
      throw new Error(`Unknown networkId: ${network}`);
  }
}

type KeysConfig = {
  openSeaAPIKey?: string;
  alchemyAPIKey?: string;
};

export async function getAssetByDID(did: string, keys?: KeysConfig) {
  const parsedData = parseAssetDID(did);

  return await getAsset(
    parsedData.network,
    parsedData.contractAddress,
    parsedData.tokenId,
    keys
  );
}
