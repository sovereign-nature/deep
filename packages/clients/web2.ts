import { SNI_API_URL } from '@sni/constants';
import type { AxiosRequestConfig } from 'axios';

export function getHotelHideawayAsset(id: string) {
  console.log(id);
  return fetch(`${SNI_API_URL}/items/hotel_hideaway/${id}`);
}

function getFortniteAsset(assetId: string, config: AxiosRequestConfig = {}) {
  console.log('getFortniteAsset', assetId);
  console.log('config', config);
  throw new Error('Not implemented');
}

export function getWeb2Asset(
  gameId: string,
  assetId: string,
  config: AxiosRequestConfig = {}
) {
  switch (gameId) {
    case 'hotel-hideaway':
      return getHotelHideawayAsset(assetId);
    case 'fortnite':
      return getFortniteAsset(assetId, config);
    default:
      throw new Error(`Unsupported game ID: ${gameId}`);
  }
}
