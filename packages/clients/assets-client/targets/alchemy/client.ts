import { DeepAsset } from '@sni/types';
import { AlchemyResponseSchema } from './schemas';

//TODO: Cover with tests
export async function getOptimismTestnetAsset(
  contractAddress: string,
  tokenId: number,
  apiKey: string,
  isTestnet: boolean = false,
  refreshCache: boolean = false
): Promise<DeepAsset> {
  const apiURL = `https://${isTestnet ? 'opt-sepolia' : 'opt-mainnet'}.g.alchemy.com/nft/v3`;
  const headers = {
    Accept: 'application/json',
  };

  const response = await fetch(
    `${apiURL}/${apiKey}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${tokenId}&refreshCache=${refreshCache}`,
    { headers }
  );

  const nftResponse = AlchemyResponseSchema.parse(await response.json());

  return {
    id: nftResponse.tokenId,
    tokenId: nftResponse.tokenId,
    name: nftResponse.name,
    description: nftResponse.description,
    image: nftResponse.image.cachedUrl, //TODO: Check if this always works
    collection: {
      id: nftResponse.contract.address,
      name: nftResponse.contract.name,
    },
    address: `did:asset:eip155:11155420.erc721:${nftResponse.contract.address}:${nftResponse.tokenId}`,
  };
}
