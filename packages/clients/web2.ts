import { SNI_API_URL } from '@sni/constants';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

function getHotelHideawayAsset(id: string, config: AxiosRequestConfig = {}) {
  console.log(id);
  return axios.get(`${SNI_API_URL}/items/hotel_hideaway/${id}`, config);
}

function getFortniteAsset(
  assetId: string,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> {
  console.log('getFortniteAsset', assetId);
  console.log('config', config);
  throw new Error('Not implemented');
}

export function getWeb2Asset(
  gameId: string,
  assetId: string,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> {
  switch (gameId) {
    case 'hotel-hideaway':
      return getHotelHideawayAsset(assetId, config);
    case 'fortnite':
      return getFortniteAsset(assetId, config);
    default:
      throw new Error(`Unsupported game ID: ${gameId}`);
  }
}
