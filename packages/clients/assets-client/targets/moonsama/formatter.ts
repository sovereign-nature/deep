import { DeepAsset } from '@sni/types';
import { MoonSamaResponse } from './types';

export default function moonSamaFormatter(
  response: MoonSamaResponse
): DeepAsset {
  const assetData = response.tokens[0];

  //TODO: Add asset address to the response
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
