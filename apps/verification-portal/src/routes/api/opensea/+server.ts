import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  // const address =
  //   url.searchParams.get('address');
  const address = '0x96ffa04a300294f810F754e0B95431c2821d3d50';
  const collection = url.searchParams.get('collection');
  const network = 'testnets-api'; //api
  const response = await fetch(
    `https://${network}.opensea.io/api/v1/assets?owner=${address}&collection_slug=${collection}&order_direction=desc&limit=50&include_orders=false`,
    {
      method: 'GET',
      // headers: {
      //   'X-API-KEY': OPEN_SEA_API_KEY,
      //   Accept: 'application/json',
      // },
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
      address: `did:asset:deep:`,
    }));

    return json(assets);
  } else {
    return json({ error: 'Failed to fetch data from OpenSea' });
  }
};
