import {
  getHotelHideawayAsset,
  getKusamaAsset,
  getMoonsamaAsset,
  getOpenSeaAsset,
  getPolkadotAsset,
} from '@sni/clients/assets-client';
import { DeepAsset } from '@sni/types';
import { Context } from 'hono';

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

export function reportUnknownNetwork(e: unknown, c: Context) {
  if (e instanceof Error) {
    return c.json({ error: true, message: e.message }, 500);
  }

  return c.json({ error: true, message: 'Internal server error' }, 500);
}
