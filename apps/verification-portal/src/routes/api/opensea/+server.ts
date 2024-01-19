import { OPEN_SEA_API_KEY } from '$env/static/private';
import { getChainId } from '@sni/address-utils';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const dev = true; //@TODO add dynamic config to switch between testnet and mainnet
  const address = url.searchParams.get('address');
  const collection = url.searchParams.get('collection');
  const network = dev ? 'testnets-api' : 'api';
  const chain = dev ? 'sepolia' : 'arbitrum';
  //TODO: add network switch here
  const response = await fetch(
    `https://${network}.opensea.io/api/v2/chain/${chain}/account/${address}/nfts?collection=${collection}&limit=50`,
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
    const { nfts } = await response.json();

    const assets = nfts.map((asset) => ({
      id: asset.identifier,
      tokenId: asset.identifier,
      name: asset.name || '',
      description: asset.description || '',
      image: asset.image_url || '',
      collection: {
        id: asset.contract,
        name: asset.collection || '',
        description: asset.collection.description || '',
      },
      //TODO: add network switch here
      address: `did:asset:eip155:${getChainId(chain)}.${asset.token_standard}:${
        asset.contract
      }:${asset.identifier}`,
    }));

    return json(assets);
  } else {
    return json({ error: 'Failed to fetch data from OpenSea' });
  }
};
