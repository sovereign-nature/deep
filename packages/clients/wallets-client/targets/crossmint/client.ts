import { DeepAsset } from '@sni/types';
import { CrossmintWalletResponse } from './schemas';

//TODO: Cover with tests
export async function listCrossmintWallet(
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
    id: nft.tokenId.toString(),
    tokenId: nft.tokenId.toString(), //TODO: DeepAsset should have tokenId as number
    name: nft.metadata.name,
    description: nft.metadata.description,
    image: nft.metadata.image,
    animationUrl: nft.metadata.animationUrl,
    collection: {
      id: nft.contractAddress,
      name: nft.metadata.name,
      description: nft.metadata.description,
    },
    address: `did:asset:eip155:${network}:${nft.contractAddress}:${nft.tokenId}`,
  }));
}
