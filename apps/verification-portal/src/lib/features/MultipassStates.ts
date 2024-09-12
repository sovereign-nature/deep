import { writable, derived } from 'svelte/store';
import type { DeepAsset } from '@sni/types';

import {
  MAX_EVOLUTION_LEVEL,
  initialStepConfig,
  STATUS,
} from '$lib/shared/multipassConfig';
import type {
  ProofStepState,
  NftStepState,
  EvolveStepState,
  MultipassStepConfig,
} from '$lib/shared/multipassConfig';

// TODO: move to types
export type MultipassData = {
  isLoggedIn: boolean;
  address: string | null;
  proofStats: {
    total: number;
    available: {
      total: number;
      air: number;
      earth: number;
      water: number;
    };
  };
  proofs: DeepAsset[] | null;
  nft: {
    DID: string | null;
    data: DeepAsset | null;
    pending: boolean;
  };
  evolution: {
    level: number;
  };
};

// Initial state
const initialState: MultipassData = {
  isLoggedIn: false,
  address: null,
  proofStats: {
    total: 0,
    available: { total: 0, air: 0, earth: 0, water: 0 },
  },
  proofs: null,
  nft: {
    DID: null,
    data: null,
    pending: false,
  },
  evolution: {
    level: 0,
  },
};

// Svelte store to hold the app state
export const multipassData = writable<MultipassData>(initialState);
// Add a generic loading state IMPROVEMENT could separate it per card/data point
export const isLoading = writable(false);
// Function to update the Multipass data
export function updateState(updates: Partial<MultipassData>) {
  multipassData.update((currentState) => {
    // Apply updates
    return { ...currentState, ...updates };
  });
}

// Derived store to compute the proof step state
export const proofStepState = derived(
  multipassData,
  ($multipassData): ProofStepState => {
    if (!$multipassData.isLoggedIn) {
      return 'LOGGED_OUT';
    } else if ($multipassData.proofStats.total === 0) {
      return 'NO_PROOFS';
    } else if ($multipassData.proofStats.available.total > 0) {
      return 'HAS_AVAILABLE_PROOFS';
    } else {
      return 'NO_AVAILABLE_PROOFS';
    }
  }
);

// Derived store to compute the NFT step state
export const nftStepState = derived(
  multipassData,
  ($multipassData): NftStepState => {
    return $multipassData.nft.DID || $multipassData.nft.pending
      ? 'CLAIMED'
      : 'UNCLAIMED';
  }
);

// Derived store to compute the evolve step state
export const evolveStepState = derived(
  multipassData,
  ($multipassData): EvolveStepState => {
    if ($multipassData.evolution.level === 0) {
      return 'INITIAL';
    } else if ($multipassData.evolution.level >= MAX_EVOLUTION_LEVEL) {
      return 'COMPLETE';
    } else {
      return 'EVOLVING';
    }
  }
);

// Derived store for the full step configuration
export const multipassStepConfig = derived(
  [proofStepState, nftStepState, evolveStepState, multipassData],
  ([
    $proofStepState,
    $nftStepState,
    $evolveStepState,
    $multipassData,
  ]): MultipassStepConfig => {
    // Proofs step is active if the user is not logged in, or if proofs are not yet complete
    const proofsStatus = !$multipassData.isLoggedIn
      ? STATUS.ACTIVE
      : $proofStepState === 'HAS_AVAILABLE_PROOFS' ||
          $multipassData.evolution.level >= MAX_EVOLUTION_LEVEL
        ? STATUS.COMPLETE
        : STATUS.ACTIVE;

    // Retrieve the disabled status from the initial configuration
    const nftDisabled = initialStepConfig.nft.disabled;
    const evolutionDisabled = initialStepConfig.evolution.disabled;

    // NFT step is locked if the user is logged out or disabled; otherwise, check other conditions
    const nftStatus =
      !$multipassData.isLoggedIn || nftDisabled
        ? STATUS.LOCKED
        : $nftStepState === 'CLAIMED'
          ? STATUS.COMPLETE
          : proofsStatus === STATUS.COMPLETE
            ? STATUS.ACTIVE
            : STATUS.LOCKED;

    // Evolution step is locked if the user is logged out or disabled; otherwise, check other conditions
    const evolutionStatus =
      !$multipassData.isLoggedIn || evolutionDisabled
        ? STATUS.LOCKED
        : proofsStatus === STATUS.COMPLETE && nftStatus === STATUS.COMPLETE
          ? $multipassData.evolution.level >= MAX_EVOLUTION_LEVEL
            ? STATUS.COMPLETE
            : STATUS.ACTIVE
          : STATUS.LOCKED;

    // Simplified MultipassStepConfig with proper disabled checks
    const stepConfig: MultipassStepConfig = {
      proofs: {
        stepStatus: proofsStatus,
        state: $proofStepState,
      },
      nft: {
        stepStatus: nftStatus,
        state: $nftStepState,
        claimed: $nftStepState === 'CLAIMED',
        disabled: nftDisabled, // User-level configuration for disabling NFT step
      },
      evolution: {
        stepStatus: evolutionStatus,
        state: $evolveStepState,
        disabled: evolutionDisabled, // User-level configuration for disabling evolution step
      },
    };

    return stepConfig;
  }
);
