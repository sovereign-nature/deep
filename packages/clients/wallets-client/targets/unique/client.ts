import { DeepAsset, ExternalApiError } from '@sni/types';
import { getUniqueAsset } from '../../../assets-client/targets/unique/client'; //TODO: Add path aliases
import { AccountTokensResponseSchema } from './schemas';

//TODO: Cover with tests
export async function getUniqueWalletAssets(
  network: 'unique' | 'opal',
  walletAddress: string,
  collectionId: number
): Promise<DeepAsset[]> {
  const response = await fetch(
    `https://rest.unique.network/${network}/v1/tokens/account-tokens?address=${walletAddress.toLowerCase()}&collectionId=${collectionId}`,
    {
      method: 'GET',
      headers: { Accept: 'application/json' },
    }
  );

  if (response.status !== 200) {
    throw new ExternalApiError(
      `Failed to fetch wallet data from ${network} network. ${response.statusText}`
    );
  }

  const nfts = AccountTokensResponseSchema.parse(await response.json()).tokens;

  const deepAssets = await Promise.all(
    nfts.map((nft) => getUniqueAsset(network, nft.collectionId, nft.tokenId))
  );

  return deepAssets;
}
