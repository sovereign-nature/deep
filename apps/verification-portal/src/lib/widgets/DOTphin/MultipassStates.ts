import { writable, derived } from 'svelte/store';
export type Status = 'locked' | 'active' | 'complete';

// Define the StepState types
type ProofStepState =
  | 'LOGGED_OUT'
  | 'NO_PROOFS'
  | 'HAS_AVAILABLE_PROOFS'
  | 'NO_AVAILABLE_PROOFS';
type NftStepState = 'CLAIMED' | 'UNCLAIMED';
type EvolveStepState = 'INITIAL' | 'EVOLVING' | 'COMPLETE';

type MultipassState = {
  isLoggedIn: boolean;
  proofs: {
    proofCount: number;
    availableProofCount: number;
    status: Status;
  };
  nft: {
    claimed: boolean;
    DID: string;
    status: Status;
    disabled: boolean;
  };
  evolution: {
    level: number;
    status: Status;
    disabled: boolean;
  };
};

export const STATUS: { LOCKED: Status; ACTIVE: Status; COMPLETE: Status } = {
  LOCKED: 'locked',
  ACTIVE: 'active',
  COMPLETE: 'complete',
};
export const MAX_EVOLUTION_LEVEL = 7;

// Initial state
const initialState: MultipassState = {
  isLoggedIn: false,
  proofs: {
    proofCount: 0,
    availableProofCount: 0,
    status: STATUS.ACTIVE as Status, // 'active' since Proof step should always be active if not logged in
  },
  nft: {
    claimed: false,
    DID: '',
    status: STATUS.LOCKED as Status,
    disabled: false,
  },
  evolution: {
    level: 0,
    status: STATUS.LOCKED as Status,
    disabled: false,
  },
};

// Svelte store to hold the app state
export const state = writable<MultipassState>(initialState);

// Derived store to compute the proof step state
export const proofStepState = derived(state, ($state): ProofStepState => {
  if (!$state.isLoggedIn) {
    return 'LOGGED_OUT';
  } else if ($state.proofs.proofCount === 0) {
    return 'NO_PROOFS';
  } else if ($state.proofs.availableProofCount > 0) {
    return 'HAS_AVAILABLE_PROOFS';
  } else {
    return 'NO_AVAILABLE_PROOFS';
  }
});

// Derived store to compute the NFT step state
export const nftStepState = derived(state, ($state): NftStepState => {
  return $state.nft.claimed ? 'CLAIMED' : 'UNCLAIMED';
});

// Derived store to compute the evolve step state
export const evolveStepState = derived(state, ($state): EvolveStepState => {
  if ($state.evolution.level === 0) {
    return 'INITIAL';
  } else if ($state.evolution.level >= MAX_EVOLUTION_LEVEL) {
    return 'COMPLETE';
  } else {
    return 'EVOLVING';
  }
});

// Function to compute derived states based on the current state
function computeDerivedState(currentState: MultipassState): MultipassState {
  const newState = { ...currentState };

  // Proof Step Logic
  if (newState.isLoggedIn) {
    newState.proofs.status =
      newState.proofs.availableProofCount > 0 ||
      newState.evolution.level >= MAX_EVOLUTION_LEVEL
        ? STATUS.COMPLETE
        : STATUS.ACTIVE;
  } else {
    newState.proofs.status = STATUS.ACTIVE; // Proof is always active when not logged in
  }

  // NFT Step Logic
  if (
    !newState.isLoggedIn ||
    newState.nft.disabled ||
    newState.proofs.proofCount <= 0
  ) {
    newState.nft.status = STATUS.LOCKED;
  } else if (newState.nft.claimed) {
    newState.nft.status = STATUS.COMPLETE;
  } else {
    newState.nft.status = STATUS.ACTIVE;
  }

  // Evolution Step Logic
  if (
    !newState.isLoggedIn ||
    newState.evolution.disabled ||
    newState.proofs.availableProofCount <= 0 ||
    !newState.nft.claimed
  ) {
    newState.evolution.status = STATUS.LOCKED;
  } else if (newState.evolution.level >= MAX_EVOLUTION_LEVEL) {
    newState.evolution.status = STATUS.COMPLETE;
  } else {
    newState.evolution.status = STATUS.ACTIVE;
  }

  return newState;
}

// Function to update the state
export function updateState(updates: Partial<MultipassState>) {
  state.update((currentState) => {
    // Apply updates
    const newState = { ...currentState, ...updates };

    // Compute derived states
    return computeDerivedState(newState);
  });
}
