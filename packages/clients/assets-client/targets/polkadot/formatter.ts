import { DeepAsset } from '@sni/types';
import { PolkadotResponse } from './types';

//TODO: Add asset address to the response
export default function polkadotFormatter(
  assetData: PolkadotResponse
): DeepAsset {
  const nftEntity = assetData.nftEntity;
  return {
    id: nftEntity.id,
    tokenId: nftEntity.sn,
    name: nftEntity.meta.name,
    description: nftEntity.meta.description,
    image: nftEntity.meta.image,
    collection: {
      id: nftEntity.collection.id,
      name: nftEntity.collection.name,
    },
  };
}
