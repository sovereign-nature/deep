import { DIRECTUS_API_KEY, VERCEL_URL } from '$env/static/private';

import { getEntity } from '@sni/clients/data.js';
import { getLinkByAddress } from '@sni/clients/link.js';
import { DEEP_ASSETS_GATEWAY } from '@sni/constants';
import { error } from '@sveltejs/kit';

import type { Asset, DeepData, VerifiedResponse } from './types'; //@TODO better way to standardize types

const protocol = 'https://';
const baseUrl = VERCEL_URL ? `${protocol}${VERCEL_URL}` : '';

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

  //@TODO maybe should be done API side?
  // Regular expression to match properties ending with 'traces_recorded'
  const regex = /(.+)_traces_recorded$/;

  const extractedProperties = {};

  if (deepData) {
    // Iterate through object properties
    for (const key in deepData) {
      // Check if the property matches the regular expression
      const match = key.match(regex);
      if (match) {
        const name = match[1].replace(/_/g, ' '); // Remove underscores and replace with space
        const value = deepData[key];
        extractedProperties[name] = value;
      }
    }
  }

  return {
    assetAddress,
    nftData: assetData,
    verifiedStatus,
    deepData,
    baseUrl,
    properties: extractedProperties,
  };
}
