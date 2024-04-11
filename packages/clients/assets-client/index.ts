import { DeepAsset } from '@sni/types';
import { parseAssetDID } from '@sni/address-utils';
import { getHotelHideawayAsset } from './targets/directus/client';
import { getKusamaAsset, getPolkadotAsset } from './targets/polkadot/client';
import { getMoonsamaAsset } from './targets/moonsama/client';
import { getOpenSeaAsset } from './targets/opensea/client';

//TODO: Cover with tests
async function getAsset(
  network: string,
  assetId: string, //TODO: Better naming, so it illustrates contract address or Web2 asset ID
  tokenId?: number,
  apiKey?: string
): Promise<DeepAsset> {
  switch (network) {
    case 'polkadot':
      return getPolkadotAsset(assetId, tokenId ? tokenId : 1);
    case 'kusama':
      return getKusamaAsset(assetId, tokenId ? tokenId : 1);
    case 'moonsama':
      return getMoonsamaAsset(assetId, tokenId ? tokenId : 1);
    case 'sepolia':
    case 'arbitrum':
      return getOpenSeaAsset(assetId, tokenId ? tokenId : 1, network, apiKey);
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
