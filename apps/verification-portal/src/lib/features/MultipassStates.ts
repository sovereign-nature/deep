import { writable, derived } from 'svelte/store';
// TODO: move to types
export type MultipassData = {
  isLoggedIn: boolean;
  proofs: {
    proofCount: number;
    availableProofCount: number;
  };
  nft: {
    DID: string | null;
  };
  evolution: {
    level: number;
  };
};
// Define the StepState types
type ProofStepState =
  | 'LOGGED_OUT'
  | 'NO_PROOFS'
  | 'HAS_AVAILABLE_PROOFS'
  | 'NO_AVAILABLE_PROOFS';
type NftStepState = 'CLAIMED' | 'UNCLAIMED';
type EvolveStepState = 'INITIAL' | 'EVOLVING' | 'COMPLETE';

export type MultipassStepConfig = {
  proofs: {
    stepStatus: Status;
    state: ProofStepState;
  };
  nft: {
    stepStatus: Status;
    state: NftStepState;
    claimed: boolean;
    disabled: boolean;
  };
  evolution: {
    stepStatus: Status;
    state: EvolveStepState;
    disabled: boolean;
  };
};
export type Status = 'locked' | 'active' | 'complete';

export const MAX_EVOLUTION_LEVEL = 7;
export const STATUS: { LOCKED: Status; ACTIVE: Status; COMPLETE: Status } = {
  LOCKED: 'locked',
  ACTIVE: 'active',
  COMPLETE: 'complete',
};
// Initial state
const initialState: MultipassData = {
  isLoggedIn: false,
  proofs: {
    proofCount: 0,
    availableProofCount: 0,
  },
  nft: {
    DID: null,
  },
  evolution: {
    level: 0,
  },
};

// Svelte store to hold the app state
export const multipassData = writable<MultipassData>(initialState);
// Function to update the Multipass data
export function updateState(updates: Partial<MultipassData>) {
  multipassData.update((currentState) => {
    // Apply updates
    return { ...currentState, ...updates };
  });
}

//TODO: Separate to another file?
// Initial MultipassStepConfig
const initialStepConfig: MultipassStepConfig = {
  proofs: {
    stepStatus: STATUS.ACTIVE, // Proofs active by default as first step
    state: 'NO_PROOFS',
  },
  nft: {
    stepStatus: STATUS.LOCKED,
    state: 'UNCLAIMED',
    claimed: false,
    disabled: false, // Disable the feature
  },
  evolution: {
    stepStatus: STATUS.LOCKED,
    state: 'INITIAL',
    disabled: true, // Disable the feature
  },
};

// Derived store to compute the proof step state
export const proofStepState = derived(
  multipassData,
  ($multipassData): ProofStepState => {
    if (!$multipassData.isLoggedIn) {
      return 'LOGGED_OUT';
    } else if ($multipassData.proofs.proofCount === 0) {
      return 'NO_PROOFS';
    } else if ($multipassData.proofs.availableProofCount > 0) {
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
    return $multipassData.nft.DID ? 'CLAIMED' : 'UNCLAIMED';
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
