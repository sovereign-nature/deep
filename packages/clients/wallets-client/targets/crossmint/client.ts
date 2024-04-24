import { DeepAsset } from '@sni/types';
import { getChainId } from '@sni/address-utils';
import { CrossmintWalletResponse } from './schemas';

//TODO: Cover with tests
export async function getCrossmintWalletAssets(
  network: string,
  walletAddress: string,
  contractAddress: string,
  apiKey: string,
  staging = false
): Promise<DeepAsset[]> {
  const response = await fetch(
    `https://${staging ? 'staging.' : ''}crossmint.com/api/2022-06-09/wallets/${network}:${walletAddress}/nfts`,
    {
      method: 'GET',
      headers: { 'X-API-KEY': apiKey, Accept: 'application/json' },
    }
  );

  if (response.status !== 200) {
    throw new Error(
      `Failed to fetch data from Crossmint: ${response.statusText}`
    );
  }

  const nfts = CrossmintWalletResponse.parse(await response.json());

  const selectedNfts = nfts.filter(
    (nft) => nft.contractAddress === contractAddress
  );

  return selectedNfts.map((nft) => ({
    id: nft.tokenId,
    tokenId: nft.tokenId,
    name: nft.metadata.name,
    description: nft.metadata.description,
    image: nft.metadata.image,
    animationUrl: nft.metadata.animationUrl,
    collection: {
      id: nft.contractAddress,
      name: nft.metadata.name,
      description: nft.metadata.description,
    },
    //TODO: Create address formatter
    //TODO: Create address validator
    //TODO: Create formatter for Crossmint response so tokenStandard is always in the same format
    address: `did:asset:eip155:${getChainId(network)}.${nft.tokenStandard.replace('-', '')}:${nft.contractAddress}:${nft.tokenId}`,
  }));
}
