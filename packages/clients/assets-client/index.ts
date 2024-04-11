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
  apiKey?: string
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
      return getOpenSeaAsset(assetId, tokenId, network, apiKey);
    case 'optimism-sepolia':
      return getOptimismAsset(assetId, tokenId, apiKey || '', true);
    case 'hotel-hideaway':
      return getHotelHideawayAsset(assetId);
    default:
      throw new Error(`Unknown networkId: ${network}`);
  }
}

export async function getAssetByDID(did: string, apiKey?: string) {
  const parsedData = parseAssetDID(did);

  return await getAsset(
    parsedData.network,
    parsedData.contractAddress,
    parsedData.tokenId,
    apiKey
  );
}
