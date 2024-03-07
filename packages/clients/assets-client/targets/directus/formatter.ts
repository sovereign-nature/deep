import { DeepAsset } from '../../types';
import { DirectusAsset } from './types';

export default function directusFormatter(assetData: DirectusAsset): DeepAsset {
  const data = assetData.data;

  return { ...data, tokenId: data.id };
}
