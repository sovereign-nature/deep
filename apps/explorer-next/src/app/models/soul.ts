export interface Soul {
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
  tokenId?: number;
  tokenURI?: string;
  geometry?: string;
  conservationStatus?: string;
}
export interface SoulFilter {
  searchById: string;
  soulStatus: number;
  createdDate: number;
  updatedDate: number;
}
