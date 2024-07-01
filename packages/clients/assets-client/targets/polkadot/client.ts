import { GraphQLClient } from 'graphql-request';
import { DeepAsset } from '@sni/types';
import { kusamaApiUrl, polkadotApiUrl } from './config';
import { getNftById } from './queries';
import { PolkadotResponse } from './types';
import polkadotFormatter from './formatter';

const polkadotClient = new GraphQLClient(polkadotApiUrl, { fetch });
const kusamaClient = new GraphQLClient(kusamaApiUrl, { fetch });

export async function getPolkadotAsset(
  collectionId: string,
  tokenId: number
): Promise<DeepAsset> {
  return polkadotFormatter(
    await polkadotClient.request<PolkadotResponse>(getNftById, {
      id: `${collectionId}-${tokenId}`,
    })
  );
}

export async function getKusamaAsset(
  collectionId: string,
  tokenId: number
): Promise<DeepAsset> {
  return polkadotFormatter(
    await kusamaClient.request<PolkadotResponse>(getNftById, {
      id: `${collectionId}-${tokenId}`,
    })
  );
}
