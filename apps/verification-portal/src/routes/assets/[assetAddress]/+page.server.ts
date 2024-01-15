import { DIRECTUS_API_KEY, VERCEL_URL } from '$env/static/private';
import { parseAddress } from '@sni/address-utils';
import { getEntity, getNewsBySteward } from '@sni/clients/data.js'; //TODO: Do we need js postfix?
import { getLinkByAddress } from '@sni/clients/link.js';
import { DEEP_ASSETS_GATEWAY } from '@sni/constants';
import { error } from '@sveltejs/kit';

import type { Address, Asset, DeepData, VerifiedResponse } from '$lib/types'; //@TODO better way to standardize types

const protocol = 'https://';
const baseUrl = VERCEL_URL ? `${protocol}${VERCEL_URL}` : '';

const config = {
  headers: { Authorization: `Bearer ${DIRECTUS_API_KEY}` },
};

let assetData: Asset;
let deepData: DeepData;
let addressDetails: Address;
const notFoundMessage = 'We’re sorry but that page can’t be found.';

export async function load(event) {
  let verifiedStatus: boolean = false;
  const assetAddress: string = event.params.assetAddress;

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
    addressDetails = parseAddress(assetAddress);
  } catch (e) {
    error(404, notFoundMessage);
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

      const { data: stewardResponse } = await getNewsBySteward(
        verifiedData.steward_id,
        5,
        config
      );
      deepData.news = stewardResponse.data ? stewardResponse.data?.news : [];
    }
  } catch (e) {
    // @TODO Enable error handling once API responds correctly
    // throw error(500, 'Oops, something went wrong');
  }

  //@TODO maybe should be done API side?
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

  const extractedProperties: ExtractedProperties = processDeepData(deepData);
  return {
    assetAddress,
    addressDetails,
    nftData: assetData,
    verifiedStatus,
    deepData,
    baseUrl,
    properties: extractedProperties,
  };
}
