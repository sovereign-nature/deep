import { getContext } from 'hono/context-storage';
import { getChainId } from '@sni/address-utils';
import { CollectionConfig } from '../config';
import { Payload } from '../types';
import { CrossmintResponseSchema } from '$lib/shared/schemas';
import { AppContext } from '$lib/shared/types';

export async function mintOptimismToken(
  address: string,
  payload: Payload,
  collectionConfig: CollectionConfig
) {
  const c = getContext<AppContext>();

  const image = `${collectionConfig.metadata.image}${payload.seed}.jpg`;
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
    `${c.env.CROSSMINT_API_URL}/${collectionConfig.externalId}/nfts/${payload.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(mintingConfig),
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': c.env.CROSSMINT_API_KEY,
      },
    }
  );

  const data = CrossmintResponseSchema.parse(await resp.json());

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
