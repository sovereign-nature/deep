import {
  getHotelHideawayAsset,
  getKusamaAsset,
  getMoonSamaAsset,
  getOpenSeaAsset,
  getPolkadotAsset,
} from '@sni/clients/assets-client';
import { DeepAsset } from '@sni/clients/assets-client/types';

//TODO: Cover with tests
export async function getAsset(
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
      return getMoonSamaAsset(assetId, tokenId ? tokenId : 1);
    case 'sepolia':
    case 'arbitrum':
      return getOpenSeaAsset(assetId, tokenId ? tokenId : 1, network, apiKey);
    case 'hotel-hideaway':
      return getHotelHideawayAsset(assetId);
    default:
      throw new Error(`Unknown networkId: ${network}`);
  }
}
