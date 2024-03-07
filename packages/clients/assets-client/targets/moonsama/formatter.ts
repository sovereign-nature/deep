import { DeepAsset } from '../../types';
import { MoonSamaResponse } from './types';

export default function moonSamaFormatter(
  response: MoonSamaResponse
): DeepAsset {
  const assetData = response.data.tokens[0];

  return {
    id: assetData.id,
    tokenId: assetData.numericId,
    name: assetData.metadata.name,
    description: assetData.metadata.description,
    image: assetData.metadata.image,
    collection: {
      id: assetData.address,
      name: 'Wildsama', //TODO: Remove hardcoded collection name
    },
  };
}
