import { getChainId } from '@sni/address-utils';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { NFTSCAN_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {
  const address = url.searchParams.get('address');
  const collection = url.searchParams.get('collection');
  const chain = 'arbitrum';

  const headers = {
    'X-API-KEY': NFTSCAN_API_KEY,
    Accept: 'application/json',
  };

  //TODO: add network switch here
  const response = await fetch(
    `https://arbitrumapi.nftscan.com/api/v2/account/own/${address}?&contract_address=${collection}&limit=50`,
    {
      method: 'GET',
      //add headers only in production mode
      headers: headers,
    }
  );

  if (response.ok) {
    const { data } = await response.json();

    const assets = data.content.map((asset) => ({
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
      address: `did:asset:eip155:${getChainId(chain)}.${asset.erc_type}:${
        asset.contract_address
      }:${asset.token_id}`,
    }));

    return json(assets);
  } else {
    return json({ error: 'Failed to fetch data from NFT Scan' });
  }
};
