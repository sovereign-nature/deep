import { getContext, hasContext, setContext } from 'svelte';
import type { Writable, Readable } from 'svelte/store';
export type CrossmintResponse = {
  id: string;
  metadata?: {
    name: string;
    description: string;
    image: string;
  };
  onChain: {
    status: string;
    chain: string;
    contractAddress: string;
    owner?: string;
    tokenId?: string;
  };
  actionId: string;
  assetDID: string;
};

export type NFTClaimProps = {
  claimIsSubmitted?: boolean;
};

const NFT_CLAIM_CONTEXT = Symbol('NFT_CLAIM_CONTEXT');
export type ClaimStatus = 'unclaimed' | 'valid' | 'invalid' | 'pending';

type NFTClaimContext = {
  claimToken: Readable<string | null>;
  formSending: Writable<boolean>;
  formUseWallet: Writable<boolean>;
  formManualAddress: Writable<string>;
  claimResponse: Writable<CrossmintResponse | null>;
  claimSubmitted: Writable<boolean>;
  claimValid: Writable<boolean>;
  claimPending: Writable<boolean>;
  claimAddress: Writable<string>;
  destroyOnClose: Writable<boolean>;
  claimStatus: Readable<ClaimStatus>;
};

export function setNFTClaimContext(config: NFTClaimContext): NFTClaimContext {
  setContext(NFT_CLAIM_CONTEXT, config);
  return config;
}

export function getNFTClaimContext(name = 'This component') {
  if (!hasContext(NFT_CLAIM_CONTEXT)) {
    throw new Error(`${name} must be used within a <NFTClaim> component`);
  }
  return getContext<ReturnType<typeof setNFTClaimContext>>(NFT_CLAIM_CONTEXT);
}
