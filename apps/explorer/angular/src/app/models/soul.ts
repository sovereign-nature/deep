export interface Soul {
  __typename?: string;
  id: string;
  owner: string;
  status: number;
  createdAt: number;
  updatedAt: number;
  name: string;
  collectionName: string;
  description?: string;
  image?: string;
  symbol?: string;
  oracle?: string;
  statusDescription?: string;
  taxonId?: string;
  tokenId?: string;
  tokenURI?: string;
  geometry?: string;
  conservationStatus?: number;
}

export interface SoulProperty {
  description: string;
  image: string;
  symbol: string;
  oracle: string;
  statusDescription: string;
  taxonId: string;
  tokenId: string;
  tokenURI: string;
  geometry: string;
  conservationStatus: number;
}
