import { NFTSCAN_API_KEY } from '$env/static/private';
import { getChainId } from '@sni/address-utils';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

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
    `https://restapi.nftscan.com/api/v2/assets/chain/${address}?chain=arbitrum`,
    {
      method: 'GET',
      //add headers only in production mode
      headers: headers,
    }
  );

  if (response.ok) {
    const responseData = await response.json();

    console.log('responseData', responseData);

    const filteredChain = responseData.data.filter(
      (n) => n.chain === 'arbitrum'
    )[0];

    if (!filteredChain) return json([]);

    const selectedCollection = filteredChain.collection_assets.filter(
      (c) => c.contract_address === collection
    )[0];

    if (!selectedCollection) return json([]);

    const unprocessedAssets = selectedCollection.assets;

    if (!unprocessedAssets) return json([]);

    const assets = unprocessedAssets.map((asset) => ({
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
      //TODO: add network switch here
      address: `did:asset:eip155:${getChainId(chain)}.${asset.erc_type}:${
        asset.contract_address
      }:${asset.token_id}`,
    }));

    console.log('assets', assets);

    return json(assets);
  } else {
    return json({ error: 'Failed to fetch data from OpenSea' });
  }
};
