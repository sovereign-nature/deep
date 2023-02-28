import { Metadata } from './metadata';

export interface Soul {
  id: string;
  owner?: string;
  status: number;
  createdAt: number;
  updatedAt: number;
  collectionName: string;
  description?: string;
  image?: string;
  symbol?: string;
  oracle?: string;
  statusDescription?: string;
  taxonId?: string;
  tokenId?: number;
  tokenURI?: string;
  computeURI?: string;
  metadata?: Metadata;
}
export interface SoulFilter {
  searchById: string;
  soulStatus: number;
  createdDate: number;
  updatedDate: number;
}
