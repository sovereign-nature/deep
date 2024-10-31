export type DOTphinUpdate = {
  image: string;
  proofs: string;
  proofsElements: string;
  level: number;
};

export type EvolutionQueueMessage = {
  tokenId: number;
  mintId: string;
  dataUpdate: DOTphinUpdate;
};

export type DOTphinElement = 'air' | 'earth' | 'water';

export type DOTphinLevel = 'orbo' | 'nix' | 'naia';
