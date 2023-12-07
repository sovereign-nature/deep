import { OPEN_SEA_API_KEY } from '$env/static/private';
import { getChainId } from '@sni/address-utils';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const dev = true; //@TODO add dynamic config to switch between testnet and mainnet
  const address = url.searchParams.get('address');
  const collection = url.searchParams.get('collection');
  const network = dev ? 'testnets-api' : 'api';
  const response = await fetch(
    `https://${network}.opensea.io/api/v1/assets?owner=${address}&collection_slug=${collection}&order_direction=desc&limit=50&include_orders=false`,
    {
      method: 'GET',
      //add headers only in production mode
      headers: !dev
        ? {
            'X-API-KEY': OPEN_SEA_API_KEY,
            Accept: 'application/json',
          }
        : {},
    }
  );

  if (response.ok) {
    const data = await response.json();
    const assets = data.assets.map((asset) => ({
      id: asset.id.toString(),
      tokenId: asset.token_id,
      name: asset.name || '',
      description: asset.description || '',
      image: asset.image_original_url,
      collection: {
        id: asset.asset_contract.address,
        name: asset.asset_contract.name || '',
        description: asset.collection.description || '',
      },
      address: `did:asset:eip155:${getChainId(
        asset.asset_contract.chain_identifier
      )}.${asset.asset_contract.schema_name}:${asset.asset_contract.address}:${
        asset.token_id
      }`,
    }));

    return json(assets);
  } else {
    return json({ error: 'Failed to fetch data from OpenSea' });
  }
};
