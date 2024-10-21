import { createAssetDID } from '@sni/address-utils';
import { DeepAsset, ExternalApiError, UniqueNetwork } from '@sni/types';
import { getContext } from 'hono/context-storage';
import { AccountTokensResponseSchema } from '@sni/clients/wallets-client/targets/unique/schemas';
import walletsApp from '../../wallets';
import {
  countByAttribute,
  countUnusedByAttribute,
  updateOrAddAttribute,
} from './attributes';
import { AppContext } from '$lib/shared/types';
import { getProof } from '$lib/db/proofs';

/**
 * Get the seed (index) of the proof element
 * @param element id of the element
 * @returns seed (index) of the element (0, 1, 2)
 */
export function getSeed(element: string) {
  const elements = ['air', 'earth', 'water'];

  return elements.indexOf(element);
}

export function getDotphinEnvConfig() {
  const c = getContext<AppContext>();
  const {
    DOTPHIN_PROOFS_COLLECTION_ID,
    DOTPHIN_COLLECTION_ID,
    DOTPHIN_NETWORK,
  } = c.env;

  const PROOFS_COLLECTION_DID = createAssetDID(
    DOTPHIN_NETWORK,
    'unique2',
    DOTPHIN_PROOFS_COLLECTION_ID
  );

  return {
    DOTPHIN_PROOFS_COLLECTION_ID,
    DOTPHIN_COLLECTION_ID,
    DOTPHIN_NETWORK,
    PROOFS_COLLECTION_DID,
  };
}

export async function getDotphinAddress(
  address: string,
  network: UniqueNetwork,
  dotphinCollectionId: number | string
) {
  const response = await fetch(
    `https://rest.unique.network/${network}/v1/tokens/account-tokens?address=${address}&collectionId=${dotphinCollectionId}`
  );

  if (!response.ok)
    throw new ExternalApiError(`External API error: ${response.statusText}`);

  const data = AccountTokensResponseSchema.parse(await response.json());

  const dotphin = data.tokens[0];

  if (!dotphin) {
    return null;
  }

  return createAssetDID(
    network,
    'unique2',
    dotphinCollectionId,
    dotphin.tokenId
  );
}

export async function getProofsWithStats(address: string) {
  const c = getContext<AppContext>();

  const { PROOFS_COLLECTION_DID } = getDotphinEnvConfig();

  const requestUrl = `/${address}?assetDID=${PROOFS_COLLECTION_DID}`;

  const result = await walletsApp.request(
    requestUrl,
    c.req.raw,
    c.env,
    c.executionCtx
  );

  const assets = (await result.json()) as DeepAsset[];

  //TODO: Remove when on-chain used state is implemented
  for (const asset of assets) {
    const proof = await getProof(c.env.SESSIONS_DB, asset.address);

    if (proof === null) {
      updateOrAddAttribute(asset.attributes!, 'used', 'false');
    } else {
      const { used } = proof;
      updateOrAddAttribute(asset.attributes!, 'used', used.toString());
    }
  }

  const total = assets.length;
  const used = countByAttribute(assets, 'used', 'true');

  const available = total - used;

  const waterAvailable = countUnusedByAttribute(assets, 'element', 'water');
  const airAvailable = countUnusedByAttribute(assets, 'element', 'air');
  const earthAvailable = countUnusedByAttribute(assets, 'element', 'earth');

  return {
    proofs: assets,
    proofsStats: {
      total,
      used,
      available: {
        water: waterAvailable,
        air: airAvailable,
        earth: earthAvailable,
        total: available,
      },
    },
  };
}
