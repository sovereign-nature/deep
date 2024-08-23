import { DeepAsset } from '@sni/types';
import { fetchWithRetry } from '@sni/clients/lib';
import { AssetNotFoundError } from '../..';
import { kusamaApiUrl, polkadotApiUrl } from './config';
import { getNftById } from './queries';

export async function getPolkadotAsset(
  collectionId: string,
  tokenId: number
): Promise<DeepAsset> {
  //@ts-expect-error - data object is not correctly typed
  const { data } = await fetchWithRetry(polkadotApiUrl, {
    //TODO: Add data validation through zod schema
    body: JSON.stringify({
      query: getNftById,
      variables: { id: `${collectionId}-${tokenId}` },
    }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const nftEntity = data.nftEntity;

  if (!nftEntity) {
    throw new AssetNotFoundError();
  }

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
    address: '', //TODO: Add DID address to the response
  };
}

//TODO: Join methods, remove duplication
export async function getKusamaAsset(
  collectionId: string,
  tokenId: number
): Promise<DeepAsset> {
  //@ts-expect-error - data object is not correctly typed
  const { data } = await fetchWithRetry(kusamaApiUrl, {
    //TODO: Add data validation through zod schema
    body: JSON.stringify({
      query: getNftById,
      variables: { id: `${collectionId}-${tokenId}` },
    }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const nftEntity = data.nftEntity;
  if (!nftEntity) {
    throw new AssetNotFoundError();
  }

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
    address: '', //TODO: Add DID address to the response
  };
}
