//TODO: parseAddress is deprecated
import { parseAddress } from '@sni/address-utils';
import { deepApiUrl } from '@sni/clients/config.js';
import { getEntity, getNewsBySteward } from '@sni/clients/data';
import { getLinkByAddress } from '@sni/clients/link';
import type { DeepAsset } from '@sni/types';
import { error } from '@sveltejs/kit';
import { DIRECTUS_API_KEY, VERCEL_URL } from '$env/static/private';

import type { Address, DeepData, VerifiedResponse } from '$lib/types'; //@TODO better way to standardize types

const protocol = 'https://';
const baseUrl = VERCEL_URL ? `${protocol}${VERCEL_URL}` : '';

const config = {
  headers: { Authorization: `Bearer ${DIRECTUS_API_KEY}` },
};

const notFoundMessage = 'We’re sorry but that page can’t be found.';

export async function load({ params }) {
  let nftData: DeepAsset;
  let deepData: DeepData | undefined = undefined;
  let addressDetails: Address;
  const assetAddress: string = params.assetAddress;
  let ecoLinked: boolean = false;

  //TODO: Move to a @sni/clients/assets-client
  try {
    // Fetch Asset data
    const fetchedAsset: DeepAsset = await (
      await fetch(`${deepApiUrl}/assets/${assetAddress}`)
    ).json();

    // Check if NFT data exists
    if (!fetchedAsset) {
      throw new Error();
    }

    nftData = fetchedAsset;
    addressDetails = parseAddress(assetAddress); //TODO: parseAddress is deprecated
  } catch (e) {
    error(404, notFoundMessage);
  }

  //TODO: Fetch data on API side
  //Fetch verified data
  try {
    const verifiedData: VerifiedResponse = await getLinkByAddress(
      assetAddress,
      config
    ).then((response) => {
      if (response.data && response.data.data) {
        ecoLinked = true;
      }
      return response.data.data;
    });
    if (ecoLinked) {
      // Fetch deep entity data
      const { data: entityResponse } = await getEntity(
        verifiedData.collection_id,
        verifiedData.entity_id,
        config
      );
      deepData = entityResponse.data;
      if (!deepData) return;
      deepData.link = verifiedData;

      const { data: stewardResponse } = await getNewsBySteward(
        verifiedData.steward_id,
        5,
        config
      );
      deepData.news = stewardResponse.data ? stewardResponse.data?.news : [];
    }
  } catch (e) {
    //TODO: Enable error handling once API responds correctly
    // throw error(500, 'Oops, something went wrong');
  }

  //TODO: maybe should be done API side?
  //TODO: Move to API
  interface ExtractedProperties {
    traces_recorded: {
      [key: string]: number;
    };
  }

  function processDeepData(deepData: DeepData): ExtractedProperties {
    const tracesRecorded: ExtractedProperties['traces_recorded'] = {};
    if (deepData && deepData.statistics) {
      // Iterate through statistics and extract traces_recorded
      deepData.statistics.forEach((kv) => {
        const name = kv.name.replace('traces_recorded', '').replace(/_/g, ' '); // Remove underscores and replace with space;
        tracesRecorded[name] = kv.value;
      });
    }

    return { traces_recorded: tracesRecorded };
  }
  let extractedProperties: ExtractedProperties;
  if (deepData !== undefined) {
    extractedProperties = processDeepData(deepData);
  } else {
    extractedProperties = { traces_recorded: {} };
  }

  return {
    assetAddress,
    addressDetails,
    nftData,
    ecoLinked,
    deepData,
    baseUrl,
    properties: extractedProperties,
  };
}
