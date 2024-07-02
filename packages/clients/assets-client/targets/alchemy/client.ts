import { DeepAsset } from '@sni/types';
import { AlchemyResponseSchema } from './schemas';

//TODO: Cover with tests
//TODO: Should we rename it to getOptimismAsset?
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

  //TODO: retry on 404 or error
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
    image: nftResponse.raw.metadata.image,
    collection: {
      id: nftResponse.contract.address,
      name: nftResponse.contract.name,
    },
    address: `did:asset:eip155:11155420.erc721:${nftResponse.contract.address}:${nftResponse.tokenId}`, //TODO: Strange that the network ID is fixed
  };
}
