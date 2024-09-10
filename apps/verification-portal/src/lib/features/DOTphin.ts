import { deepApiUrl } from '@sni/clients/config';
import { updateState } from './MultipassStates';

// API URL
const BASE_URL = `${deepApiUrl}/dotphin`; // Replace with actual API URL

// Fetch Dotphin Data for a given address
async function fetchDotphinData(address: string) {
  try {
    const response = await fetch(`${BASE_URL}/${address}`);
    if (response.ok) {
      const data = await response.json();
      updateState({
        proofs: {
          proofCount: data.proofsStats.total,
          availableProofCount: data.proofsStats.available.total,
        },
        nft: {
          DID: data.dotphinDID,
        },
      });
    } else {
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
      console.log('Claim in progress');
    } else {
      console.error('Failed to submit claim');
    }
  } catch (error) {
    console.error('Error submitting claim:', error);
  }
}

// Example: Fetch data for a specific address
export async function updateMultipassStateForAddress(address: string) {
  await fetchDotphinData(address);
}

// Example: Claim a DOTphin NFT
export async function claimDotphinNFT(address: string, proofDID: string) {
  await submitClaim(address, proofDID);
}
