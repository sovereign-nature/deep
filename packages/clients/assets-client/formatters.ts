import {
  OpenSeaResponse,
  PolkadotResponse,
  DirectusAsset,
  DeepAsset,
} from './types';

export function openSeaFormatter(assetData: OpenSeaResponse): DeepAsset {
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

export function directusFormatter(assetData: DirectusAsset): DeepAsset {
  const data = assetData.data;

  return { ...data, tokenId: data.id };
}

export function polkadotFormatter(assetData: PolkadotResponse): DeepAsset {
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