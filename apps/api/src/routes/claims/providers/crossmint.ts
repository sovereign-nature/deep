import { Context } from 'hono';
import { env } from 'hono/adapter';
import { getChainId } from '@sni/address-utils';
import { CollectionConfig } from '../config';
import { Payload } from '../types';
import { CrossmintResponse } from '../schemas';

export async function mintOptimismToken(
  address: string,
  payload: Payload,
  collectionConfig: CollectionConfig,
  c: Context
) {
  const { CROSSMINT_API_URL } = env<{ CROSSMINT_API_URL: string }>(c);
  const { CROSSMINT_API_KEY } = env<{ CROSSMINT_API_KEY: string }>(c);

  const image = `${collectionConfig.metadata.imagePrefix}${payload.seed}.jpg`;
  const metadata = {
    name: collectionConfig.metadata.name,
    description: collectionConfig.metadata.description,
    image,
  };

  const mintingConfig = {
    metadata,
    recipient: `${collectionConfig.network}:${address}`,
  };

  const resp = await fetch(
    `${CROSSMINT_API_URL}/${payload.collection}/nfts/${payload.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(mintingConfig),
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': CROSSMINT_API_KEY,
      },
    }
  );

  const data = CrossmintResponse.parse(await resp.json());

  if (data.onChain.owner && data.onChain.owner !== address) {
    return c.json(
      {
        error: true,
        message: 'Token was already claimed for different owner address',
      },
      400
    );
  }

  // If the token was successfully minted, return all the data plus DID address
  if (data.onChain.status === 'success') {
    const chainId = getChainId(data.onChain.chain);
    const assetDID = `did:asset:eip155:${chainId}.erc721:${data.onChain.contractAddress}:${data.onChain.tokenId}`;

    return c.json({ ...data, assetDID });
  }

  return c.json(data);
}
