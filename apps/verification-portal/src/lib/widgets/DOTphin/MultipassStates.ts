import { writable } from 'svelte/store';
export type Status = 'locked' | 'active' | 'complete';

export const STATUS: { LOCKED: Status; ACTIVE: Status; COMPLETE: Status } = {
  LOCKED: 'locked',
  ACTIVE: 'active',
  COMPLETE: 'complete',
};
const MAX_EVOLUTION_LEVEL = 7;

// Initial state
const initialState: MultipassState = {
  isLoggedIn: false,
  proofs: {
    proofCount: 0,
    unusedProofCount: 0,
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

//
type MultipassState = {
  isLoggedIn: boolean;
  proofs: {
    proofCount: number;
    unusedProofCount: number;
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

// Svelte store to hold the app state
export const state = writable<MultipassState>(initialState);

// Function to compute derived states based on the current state
function computeDerivedState(currentState: MultipassState): MultipassState {
  const newState = { ...currentState };

  // Proof Step Logic
  if (newState.isLoggedIn) {
    newState.proofs.status =
      newState.proofs.unusedProofCount > 0 ? STATUS.COMPLETE : STATUS.ACTIVE;
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
    newState.proofs.unusedProofCount <= 0 ||
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
