import { get } from 'svelte/store';
import { deepApiUrl } from '@sni/clients/config';
import type { DeepAsset } from '@sni/types';
import { getAssetByDID } from '@sni/clients/assets-client';
import { toast } from 'svelte-sonner';
import { updateState, isLoading, multipassData } from './MultipassStates';
import type { CrossmintResponse } from '$lib/widgets/NFTClaim/context';
import { collections, type Collection } from '$lib/shared/collectionsConfig';

// API URL
const BASE_URL = `${deepApiUrl}/dotphin`;

// DOTphin collection configs
const DOTPHIN_COLLECTION: Collection = collections.find(
  (collection) => collection.key === 'dotphin-proofs'
) as Collection;
const TESTNET_CONTRACT_ADDRESS = '3551';

// Fetch Dotphin Data for a given address
async function fetchDotphinData(address: string) {
  try {
    const response = await fetch(`${BASE_URL}/${address}`);
    if (response.ok) {
      const data = await response.json();
      const currentState = get(multipassData);
      updateState({
        address: data.address,
        proofStats: {
          total: data.proofsStats.total,
          available: data.proofsStats.available,
        },
        proofs: data.proofs,
        nft: {
          ...currentState.nft,
          DID: data.dotphinDID,
        },
      });

      // Check if DID is present and fetch asset data
      if (data.dotphinDID) {
        await fetchNFTDataByDID(data.dotphinDID);
      }
    } else {
      // reset the state in the case no nft
      const currentState = get(multipassData);
      updateState({
        ...currentState,
        nft: {
          ...currentState.nft,
          data: null,
        },
      });
      console.error('Failed to fetch dotphin data');
    }
  } catch (error) {
    console.error('Error fetching dotphin data:', error);
  }
}

// Submit a claim for a DOTphin NFT
async function submitClaim(address: string, proofDID: string) {
  try {
    const response = await fetch(`${BASE_URL}/claim`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address, proofDID }),
    });

    if (response.ok) {
      const currentState = get(multipassData);
      updateState({
        ...currentState,
        nft: {
          DID: null,
          data: null,
          pending: true, //TODO: get claim ID, refresh status on complete state
        },
      });
      updateMultipassStateForAddress(address);
    } else {
      console.error('Failed to submit claim');
    }
  } catch (error) {
    console.error('Error submitting claim:', error);
  }
}

// Fetch data for a specific address
export async function updateMultipassStateForAddress(address: string) {
  isLoading.set(true);
  try {
    await fetchDotphinData(address);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.set(false);
  }
}

// Claim a DOTphin NFT
export async function claimDOTphinNFT(address: string, proofDID: string) {
  try {
    await submitClaim(address, proofDID).then(() => {
      toast.success('Claim submitted successfully');
      console.log('Claim submitted successfully for address:', address);
    });
  } catch (error) {
    toast.error(
      'Something went wrong while submitting the request, please refresh the page and try again'
    );

    console.error('Error during claim submission for address:', address, error);
  }
}

export async function checkIfDOTphin(address: string, data: CrossmintResponse) {
  if (
    DOTPHIN_COLLECTION.collectionAddress === data.onChain.contractAddress ||
    TESTNET_CONTRACT_ADDRESS === data.onChain.contractAddress
  ) {
    await updateMultipassStateForAddress(address);
  }
}

function findProofByTraitType(
  proofs: DeepAsset[],
  element: 'air' | 'water' | 'earth'
): string | undefined {
  console.log(proofs);
  const proof = proofs.find(
    (proof) =>
      proof.attributes &&
      proof.attributes.some(
        (attr) => attr.trait_type === 'element' && attr.value === element
      )
  );
  return proof ? proof.address : undefined;
}

export async function claimProofByTraitType(
  address: string,
  element: 'air' | 'water' | 'earth'
) {
  const data = get(multipassData);

  const proofAddress = data.proofs
    ? findProofByTraitType(data.proofs, element)
    : undefined;
  if (proofAddress) {
    console.log('will claim');

    await claimDOTphinNFT(address, proofAddress);
  } else {
    console.log(`No proof found for trait type: ${element}`);
  }
}

// Function to fetch NFT data by DID
async function fetchNFTDataByDID(did: string) {
  try {
    const currentState = get(multipassData);
    if (!currentState.nft.data || currentState.nft.DID !== did) {
      const asset = await getAssetByDID(did);
      updateState({
        ...currentState,
        nft: {
          ...currentState.nft,
          data: asset,
        },
      });
    }
  } catch (error) {
    console.error('Error fetching NFT data:', error);
  }
}

// Dev function: Burn a dotphin based on DID
export async function burnDOTphinNFT() {
  const currentState = get(multipassData);
  const dotphinDID = currentState.nft.DID;

  if (!dotphinDID) {
    console.log('No dotphinDID found in multipassData');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/burn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dotphinDID,
        owner: currentState.address,
      }),
    });

    if (response.ok) {
      console.log('DOTphin NFT burned successfully');
      toast.success('Burned the NFT');
      // Optionally, update the state to reflect the burned NFT
      updateState({
        ...currentState,
        nft: {
          DID: null,
          data: null,
          pending: false,
        },
      });
    } else {
      console.error('Failed to burn DOTphin NFT');
    }
  } catch (error) {
    console.error('Error burning DOTphin NFT:', error);
  }
}
