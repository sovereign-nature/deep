import { DeepAsset } from '@sni/types';
import { getUniqueAsset } from '../../../assets-client/targets/unique/client'; //TODO: Add path aliases
import { fetchWithRetry } from '../../../lib';
import { AccountTokensResponseSchema } from './schemas';

//TODO: Cover with tests
export async function getUniqueWalletAssets(
  network: 'unique' | 'opal', //TODO: Use UniqueNetwork type (move it to shared types)
  walletAddress: string,
  collectionId: number
): Promise<DeepAsset[]> {
  const data = await fetchWithRetry(
    `https://rest.unique.network/${network}/v1/tokens/account-tokens?address=${walletAddress.toLowerCase()}&collectionId=${collectionId}`,
    {
      method: 'GET',
      headers: { Accept: 'application/json' },
    }
  );

  const nfts = AccountTokensResponseSchema.parse(data).tokens;

  const deepAssets = await Promise.all(
    nfts.map((nft) => getUniqueAsset(network, nft.collectionId, nft.tokenId))
  );

  return deepAssets;
}
