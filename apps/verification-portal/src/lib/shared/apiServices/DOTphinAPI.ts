// apiService.ts
import { deepApiUrl } from '@sni/clients/config';

// API URL
const BASE_URL = `${deepApiUrl}/dotphin`;

// Fetch Dotphin Data
export async function fetchDotphinData(address: string) {
  const response = await fetch(`${BASE_URL}/${address}`);
  if (!response.ok) throw new Error('Failed to fetch Dotphin data');
  return await response.json();
}

// Submit Claim
export async function submitClaim(address: string, proofDID: string) {
  const response = await fetch(`${BASE_URL}/claim`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address, proofDID }),
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to submit claim');
  return await response.json();
}

// Check Claim Status
export async function claimStatus(claimId: string) {
  const response = await fetch(`${BASE_URL}/claims/${claimId}`);
  if (!response.ok) throw new Error('Failed to check claim status');
  const data = await response.json();
  return data.onChain.status === 'success';
}

// Burn NFT
export async function burnNFT(dotphinDID: string, owner: string) {
  const response = await fetch(`${BASE_URL}/burn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dotphinDID, owner }),
  });
  if (!response.ok) throw new Error('Failed to burn DOTphin NFT');
  return response.ok;
}
