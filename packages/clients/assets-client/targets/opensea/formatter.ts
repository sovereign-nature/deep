import { DeepAsset } from '../../types';
import { OpenSeaResponse } from './types';

export default function openSeaFormatter(
  assetData: OpenSeaResponse
): DeepAsset {
  return {
    id: assetData.nft.identifier,
    tokenId: assetData.nft.identifier,
    name: assetData.nft.name,
    description: assetData.nft.description,
    image: assetData.nft.image_url, //TODO: Use asset_contract.image_url instead?
    collection: {
      id: assetData.collection.collection,
      name: assetData.collection.name,
    },
  };
}
