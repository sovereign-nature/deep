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
  evolveDotphin,
  claimStatus,
  burnNFT,
} from '$lib/shared/apiServices/DOTphinAPI';
import { setCookie, removeCookie } from '$lib/shared/utils';

import type { CrossmintResponse } from '$lib/widgets/NFTClaim/context';

// DOTphin Collection and Testnet Contract ID
const TESTNET_CONTRACT_ADDRESS = '3551';
const DOTPHIN_CONTRACT_ADDRESS = '665';

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
      evolution: {
        level: data.dotphin ? getLevelAttributeValue(data.dotphin) : 0,
        maxLevel: data.dotphinMaxLevel,
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
    DOTPHIN_CONTRACT_ADDRESS === data.onChain.contractAddress ||
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
// Get Level Attribute Value
function getLevelAttributeValue(asset: DeepAsset): number {
  const levelAttribute = asset.attributes?.find(
    (attr) => attr.trait_type === 'level'
  );
  return levelAttribute ? Number(levelAttribute.value) : 0;
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
export async function handleProofByTraitType(
  address: string,
  element: 'air' | 'water' | 'earth',
  action: 'claim' | 'evolve'
) {
  const data = get(multipassData);
  const proofAddress = data.proofs
    ? findProofByTraitType(data.proofs, element)
    : undefined;
  if (proofAddress) {
    if (action === 'claim') {
      await claimDOTphinNFT(address, proofAddress);
    } else if (action === 'evolve') {
      const dotphinDID = data.nft.DID;
      if (dotphinDID) {
        await evolveDOTphinNFT(address, dotphinDID, proofAddress);
      } else {
        toast.error(
          'Error: No DOTphin found for evolution, please refresh the page and try again'
        );
        console.log('No DOTphin DID found for evolution');
      }
    }
  } else {
    toast.error(
      'Error finding a valid proof, please refresh the page and try again'
    );
    console.log(`No proof found for trait type: ${element}`);
  }
}

// Evolve DOTphin NFT
export async function evolveDOTphinNFT(
  address: string,
  dotphinDID: string,
  proofDID: string
) {
  try {
    const evolveData = await evolveDotphin(address, dotphinDID, proofDID);
    toast.success('Evolution submitted successfully');
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
      nft: { DID: dotphinDID, data: evolveData, pending: true },
      evolution: {
        ...currentState.evolution,
        level: currentState.evolution.level + 1,
      },
    });
    setCookie('claimPending', evolveData.id);
    checkClaimStatus(evolveData.id, address);
  } catch (error) {
    toast.error('Error submitting evolve, please try again');
    console.error('Error during evolve submission:', error);
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
