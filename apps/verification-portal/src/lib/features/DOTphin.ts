// mainModule.ts
import { get } from 'svelte/store';
import { toast } from 'svelte-sonner';
import { getAssetByDID } from '@sni/clients/assets-client';
import type { DeepAsset } from '@sni/types';
import {
  updateState,
  isLoading,
  multipassData,
} from '$lib/features/MultipassStates';
import {
  fetchDotphinData,
  submitClaim,
  claimStatus,
  burnNFT,
} from '$lib/shared/apiServices/DOTphinAPI';
import { setCookie, removeCookie } from '$lib/shared/utils';

import type { CrossmintResponse } from '$lib/widgets/NFTClaim/context';
import { collections, type Collection } from '$lib/shared/collectionsConfig';

// DOTphin Collection and Testnet Contract Address
const DOTPHIN_COLLECTION: Collection = collections.find(
  (collection) => collection.key === 'dotphin-proofs'
) as Collection;

const TESTNET_CONTRACT_ADDRESS = '3551';

// Fetch Data and Update State
export async function updateMultipassStateForAddress(address: string) {
  isLoading.set(true);
  try {
    const data = await fetchDotphinData(address);
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
        pending: false,
      },
    });

    if (data.dotphinDID) {
      await fetchNFTDataByDID(data.dotphinDID);
    } else {
      const currentState = get(multipassData);
      updateState({
        ...currentState,
        nft: { ...currentState.nft, data: null },
      });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.set(false);
  }
}

// Claim DOTphin NFT
export async function claimDOTphinNFT(address: string, proofDID: string) {
  try {
    const claimData = await submitClaim(address, proofDID);
    toast.success('Claim submitted successfully');
    const currentState = get(multipassData);
    updateState({
      ...currentState,
      proofStats: {
        ...currentState.proofStats,
        available: {
          ...currentState.proofStats.available,
          total: currentState.proofStats.available.total - 1,
        },
      },
      nft: { DID: null, data: claimData, pending: true },
    });
    setCookie('claimPending', claimData.id);
    checkClaimStatus(claimData.id, address);
  } catch (error) {
    toast.error('Error submitting claim, please try again');
    console.error('Error during claim submission:', error);
  }
}

// Check if DOTphin
export async function checkIfDOTphin(address: string, data: CrossmintResponse) {
  if (
    DOTPHIN_COLLECTION.collectionAddress === data.onChain.contractAddress ||
    TESTNET_CONTRACT_ADDRESS === data.onChain.contractAddress
  ) {
    await updateMultipassStateForAddress(address);
  }
}

// Check Claim Status and Update
function checkClaimStatus(claimId: string, address: string) {
  if (!claimId) return;
  const intervalId = setInterval(async () => {
    const resolved = await claimStatus(claimId);
    if (resolved) {
      clearInterval(intervalId);
      removeCookie('claimPending');
      toast.success('Claim resolved successfully');
      updateMultipassStateForAddress(address);
    }
  }, 10000);
}

// Fetch NFT Data by DID
async function fetchNFTDataByDID(did: string) {
  try {
    const currentState = get(multipassData);
    const asset = await getAssetByDID(did);
    updateState({
      ...currentState,
      nft: { ...currentState.nft, data: asset },
    });
  } catch (error) {
    console.error('Error fetching NFT data:', error);
  }
}

// Find Proof by Trait Type
function findProofByTraitType(
  proofs: DeepAsset[],
  element: 'air' | 'water' | 'earth'
): string | undefined {
  const proof = proofs.find(
    (proof) =>
      proof.attributes?.some(
        (attr) => attr.trait_type === 'element' && attr.value === element
      ) &&
      proof.attributes?.some(
        (attr) => attr.trait_type === 'used' && attr.value === 'false'
      )
  );
  return proof?.address;
}

// Claim Proof by Trait Type
export async function claimProofByTraitType(
  address: string,
  element: 'air' | 'water' | 'earth'
) {
  const data = get(multipassData);
  const proofAddress = data.proofs
    ? findProofByTraitType(data.proofs, element)
    : undefined;
  if (proofAddress) {
    await claimDOTphinNFT(address, proofAddress);
  } else {
    toast.error(
      'Error finding a valid proof, please refresh the page and try again'
    );
    console.log(`No proof found for trait type: ${element}`);
  }
}

// Burn DOTphin NFT
export async function burnDOTphinNFT() {
  const currentState = get(multipassData);
  const dotphinDID = currentState.nft.DID;
  if (!dotphinDID || !currentState.address) {
    console.log('No dotphinDID found in multipassData');
    return;
  }
  try {
    await burnNFT(dotphinDID, currentState.address);
    toast.success('Burned the NFT');
    updateState({
      ...currentState,
      nft: { DID: null, data: null, pending: false },
    });
  } catch (error) {
    console.error('Error burning DOTphin NFT:', error);
  }
}
