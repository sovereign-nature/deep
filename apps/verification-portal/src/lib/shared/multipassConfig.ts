export const MAX_EVOLUTION_LEVEL = 7;

// Multipass step states, derived from API data. Used for dynamic UI/UX and translation based on API Data points
export type ProofStepState =
  | 'LOGGED_OUT'
  | 'NO_PROOFS'
  | 'HAS_AVAILABLE_PROOFS'
  | 'NO_AVAILABLE_PROOFS';
export type NftStepState = 'CLAIMED' | 'UNCLAIMED';
export type EvolveStepState = 'INITIAL' | 'EVOLVING' | 'COMPLETE';

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
type Status = 'locked' | 'active' | 'complete';
// status of the Multipass step card determines if user can interact with the card, step icon.
export const STATUS: { LOCKED: Status; ACTIVE: Status; COMPLETE: Status } = {
  LOCKED: 'locked',
  ACTIVE: 'active',
  COMPLETE: 'complete',
};

// Initial MultipassStepConfig
export const initialStepConfig: MultipassStepConfig = {
  proofs: {
    stepStatus: STATUS.ACTIVE, // Proofs active by default as first step/login prompt
    state: 'NO_PROOFS',
  },
  nft: {
    stepStatus: STATUS.LOCKED,
    state: 'UNCLAIMED',
    claimed: false,
    disabled: false, // Disable the feature if collection is not yet available
  },
  evolution: {
    stepStatus: STATUS.LOCKED,
    state: 'INITIAL',
    disabled: true, // Disable the feature if evolution is not yet available
  },
};
