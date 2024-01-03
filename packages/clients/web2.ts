import { SNI_API_URL } from '@sni/constants';

export type DirectusAsset = {
  data: {
    id: string;
    name: string;
    description: string;
    image: string;
    collection: {
      id: string;
      name: string;
      description: string;
    };
  };
};

export async function getHotelHideawayAsset(id: string) {
  const web2Res = await fetch(
    `${SNI_API_URL}/items/hotel_hideaway/${id}?fields=*,collection.*`
  );

  return (await web2Res.json()) as DirectusAsset;
}

export function getWeb2Asset(gameId: string, assetId: string) {
  switch (gameId) {
    case 'hotel-hideaway':
      return getHotelHideawayAsset(assetId);
    default:
      throw new Error(`Unsupported game ID: ${gameId}`);
  }
}
