import { DIRECTUS_API_KEY, VERCEL_URL } from '$env/static/private';

import { getEntity } from '@sni/clients/data.js';
import { getLinkByAddress } from '@sni/clients/link.js';
import { DEEP_ASSETS_GATEWAY } from '@sni/constants';
import { error } from '@sveltejs/kit';

import type { Asset, DeepData, VerifiedResponse } from './types'; //@TODO better way to standardize types

console.log(`Vercel URL:${VERCEL_URL}`);
const baseUrl = VERCEL_URL;

const config = {
  headers: { Authorization: `Bearer ${DIRECTUS_API_KEY}` },
};

let assetData: Asset;
let deepData: DeepData;
const notFoundMessage = 'We’re sorry but that page can’t be found.';

export async function load(event) {
  let verifiedStatus: boolean = false;
  const assetAddress = event.params.assetAddress;
  try {
    // Fetch Asset data
    const fetchedAsset: Asset = await (
      await fetch(`${DEEP_ASSETS_GATEWAY}/${assetAddress}`)
    ).json();

    // Check if NFT data exists
    if (!fetchedAsset) {
      throw new Error();
    }

    assetData = fetchedAsset;
  } catch (e) {
    throw error(404, notFoundMessage);
  }

  //Fetch verified data
  try {
    const verifiedData: VerifiedResponse = await getLinkByAddress(
      assetAddress,
      config
    ).then((response) => {
      if (response.data && response.data.data) {
        verifiedStatus = true;
      }
      return response.data.data;
    });
    if (verifiedStatus) {
      // Fetch deep entity data
      const { data: entityResponse } = await getEntity(
        verifiedData.collection_id,
        verifiedData.entity_id,
        config
      );

      deepData = entityResponse.data;
      deepData.link = verifiedData;
    }
  } catch (e) {
    // @TODO Enable error handling once API responds correctly
    // throw error(500, 'Oops, something went wrong');
  }

  return {
    assetAddress,
    nftData: assetData,
    verifiedStatus,
    deepData,
    baseUrl,
  };
}
