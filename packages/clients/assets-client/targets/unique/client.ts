import { DeepAsset } from '@sni/types';
import { UniqueNFTResponseSchema } from './schemas';

export async function getUniqueAsset(
  network: string,
  collectionId: number,
  tokenId: number
): Promise<DeepAsset> {
  const apiURL = `https://rest.unique.network/${network}/v1/`;
  const headers = {
    Accept: 'application/json',
  };

  //TODO: retry on 404 or error
  const response = await fetch(
    `${apiURL}/tokens/v2?collectionId=${collectionId}&tokenId=${tokenId}`,
    { headers }
  );

  const nftResponse = UniqueNFTResponseSchema.parse(await response.json());

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
    address: `did:asset:eip155:11155420.unique2:${collectionId}:${nftResponse.tokenId}`, //TODO: Proper network ID
  };
}
