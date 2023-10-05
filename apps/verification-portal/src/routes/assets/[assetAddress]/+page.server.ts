import { DIRECTUS_API_KEY } from '$env/static/private';

import { parseAddress } from '@sni/address-utils';
import { getEntity } from '@sni/clients/data.js';
import { getLinkByAddress } from '@sni/clients/link.js';
import { getNftData } from '@sni/clients/nft';
import { error } from '@sveltejs/kit';
import type {
  DeepData,
  NftAsset,
  NftResponse,
  VerifiedResponse,
} from './types'; //@TODO better way to standardize types

const config = {
  headers: { Authorization: `Bearer ${DIRECTUS_API_KEY}` },
};

let nftData: NftAsset;
let deepData: DeepData;
const notFoundMessage = 'We’re sorry but that page can’t be found.';

export async function load(event) {
  let verifiedStatus: boolean = false;
  const assetAddress = event.params.assetAddress;
  try {
    // Fetch NFT data
    const { reference, identifier } = parseAddress(assetAddress).asset;
    const nftDataResponse: NftResponse = (await getNftData(
      'polkadot',
      reference,
      identifier
    )) as NftResponse;

    // Check if NFT data exists
    if (!nftDataResponse.nftEntity) {
      throw new Error();
    }
    nftData = nftDataResponse.nftEntity;
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

  return { assetAddress, nftData, verifiedStatus, deepData };
}
