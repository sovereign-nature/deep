export type VerifiedResponse = {
  id: string;
  steward_id: string;
  entity_id: string;
  collection_id: string;
};

export type NftAsset = {
  id: string;
  sn: string;
  collection: object;
};

export type NftResponse = {
  nftEntity?: NftAsset | null;
};
