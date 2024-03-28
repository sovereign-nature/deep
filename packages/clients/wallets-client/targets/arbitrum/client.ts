import { getChainId } from '@sni/address-utils';
import { DeepAsset } from '@sni/types';
import { NftScanResponse } from './schemas';

export async function getArbitrumWalletAssets(
  walletAddress: string,
  contractAddress: string,
  apiKey: string
): Promise<DeepAsset[]> {
  const response = await fetch(
    `https://arbitrumapi.nftscan.com/api/v2/account/own/${walletAddress}?&contract_address=${contractAddress}&limit=50`,
    {
      method: 'GET',
      headers: { 'X-API-KEY': apiKey, Accept: 'application/json' },
    }
  );

  const responseJson = await response.json();

  if (response.ok && response.status === 200) {
    const data = NftScanResponse.parse(responseJson).data;

    const assets: DeepAsset[] = data.content.map((asset) => ({
      id: asset.token_id,
      tokenId: asset.token_id,
      name: asset.name || '',
      description: asset.description || '',
      image: asset.image_uri || '',
      collection: {
        id: asset.contract_address,
        name: asset.contract_name || '',
        description: '',
      },
      address: `did:asset:eip155:${getChainId('arbitrum')}.${asset.erc_type}:${
        asset.contract_address
      }:${asset.token_id}`,
    }));

    return assets;
  } else {
    throw new Error(
      JSON.stringify(responseJson) || 'Failed to fetch data from NFT Scan'
    );
  }
}
