import { GraphQLClient } from 'graphql-request';
import { DeepAsset } from '@sni/types';
import { AssetNotFoundError } from '../..';
import { kusamaApiUrl, polkadotApiUrl } from './config';
import { getNftById } from './queries';
import { PolkadotResponse } from './types';

const polkadotClient = new GraphQLClient(polkadotApiUrl, { fetch });
const kusamaClient = new GraphQLClient(kusamaApiUrl, { fetch });

export async function getPolkadotAsset(
  collectionId: string,
  tokenId: number
): Promise<DeepAsset> {
  const res = await polkadotClient.request<PolkadotResponse>(getNftById, {
    id: `${collectionId}-${tokenId}`,
  });

  const nftEntity = res.nftEntity;
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

export async function getKusamaAsset(
  collectionId: string,
  tokenId: number
): Promise<DeepAsset> {
  const res = await kusamaClient.request<PolkadotResponse>(getNftById, {
    id: `${collectionId}-${tokenId}`,
  });

  const nftEntity = res.nftEntity;
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
