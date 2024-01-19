import { OPEN_SEA_API_KEY } from '$env/static/private';
import { getChainId } from '@sni/address-utils';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  console.log('Getting NFTs');

  const address = url.searchParams.get('address');
  const collection = url.searchParams.get('collection');
  const network = 'api';
  const chain = 'arbitrum';
  //TODO: add network switch here

  const headers = {
    'X-API-KEY': OPEN_SEA_API_KEY,
    Accept: 'application/json',
  };

  const response = await fetch(
    `https://${network}.opensea.io/api/v2/chain/${chain}/account/${address}/nfts?collection=${collection}&limit=50`,
    {
      method: 'GET',
      headers: headers,
    }
  );

  console.log('response', response);

  if (response.ok) {
    const { nfts } = await response.json();
    console.log('nfts', nfts);

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
