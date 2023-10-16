import { SNI_API_URL } from '@sni/constants';

export function getHotelHideawayAsset(id: string) {
  return fetch(
    `${SNI_API_URL}/items/hotel_hideaway/${id}?fields=*,collection.*`
  );
}

export function getWeb2Asset(gameId: string, assetId: string) {
  switch (gameId) {
    case 'hotel-hideaway':
      return getHotelHideawayAsset(assetId);
    default:
      throw new Error(`Unsupported game ID: ${gameId}`);
  }
}
