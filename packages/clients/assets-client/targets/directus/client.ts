import { DeepAsset } from '../../types';
import { directusUrl } from '../../../config';
import directusFormatter from './formatter';
import { DirectusAsset } from './types';

export async function getHotelHideawayAsset(id: string): Promise<DeepAsset> {
  const web2Res = await fetch(
    `${directusUrl}/items/hotel_hideaway/${id}?fields=*,collection.*`
  );

  const directusAsset = (await web2Res.json()) as DirectusAsset;

  return directusFormatter(directusAsset);
}
