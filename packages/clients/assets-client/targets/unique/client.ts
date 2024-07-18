import { DeepAsset } from '@sni/types';
import { createAssetDID } from '@sni/address-utils';
import { fetchWithRetry } from '../../../lib';
import { UniqueNFTResponseSchema } from './schemas';

export async function getUniqueAsset(
  network: 'opal' | 'unique',
  collectionId: number,
  tokenId: number
): Promise<DeepAsset> {
  const apiURL = `https://rest.unique.network/${network}/v1/`;

  const data = await fetchWithRetry(
    `${apiURL}/tokens/v2?collectionId=${collectionId}&tokenId=${tokenId}`,
    { headers: { Accept: 'application/json' }, method: 'GET' }
  );

  const nftResponse = UniqueNFTResponseSchema.parse(data);

  return {
    id: nftResponse.tokenId.toString(),
    tokenId: nftResponse.tokenId.toString(),
    name: nftResponse.name,
    description: nftResponse.description || '',
    image: nftResponse.image,
    collection: {
      id: nftResponse.collectionId.toString(),
      name: '', //TODO: Make name optional in the schema
    },
    address: createAssetDID(
      network,
      'unique2',
      nftResponse.collectionId,
      nftResponse.tokenId
    ),
  };
}
