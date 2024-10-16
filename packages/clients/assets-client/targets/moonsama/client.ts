import { DeepAsset } from '@sni/types';
import { fetchWithRetry } from '../../../lib';
import { moonSamaApiUrl } from './config';
import { getNFT } from './queries';

export async function getMoonsamaAsset(
  contractAddress: string,
  tokenId: number
): Promise<DeepAsset> {
  //@ts-expect-error - data object is not correctly typed
  const { data } = await fetchWithRetry(moonSamaApiUrl, {
    body: JSON.stringify({
      query: getNFT,
      variables: { contractAddress, tokenId },
    }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const assetData = data.tokens[0]; //TODO: Add data validation through zod schema

  return {
    id: assetData.id,
    tokenId: assetData.numericId,
    name: assetData.metadata.name,
    description: assetData.metadata.description,
    image: assetData.metadata.image,
    address: '', //TODO: Add asset address to the response
    collection: {
      id: assetData.address,
      name: 'Wildsama', //TODO: Remove hardcoded collection name
    },
  };
}
