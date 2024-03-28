import { GraphQLClient } from 'graphql-request';
import { DeepAsset } from '@sni/types';
import { moonSamaApiUrl } from './config';
import { MoonSamaResponse } from './types';
import { getNFT } from './queries';
import moonSamaFormatter from './formatter';

const moonSamaClient = new GraphQLClient(moonSamaApiUrl, { fetch });

export async function getMoonsamaAsset(
  contractAddress: string,
  tokenId: number
): Promise<DeepAsset> {
  return moonSamaFormatter(
    await moonSamaClient.request<MoonSamaResponse>(getNFT, {
      contractAddress,
      tokenId,
    })
  );
}
