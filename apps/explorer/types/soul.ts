export interface Soul {
  id: string
  status: number
  createdAt: number
  updatedAt: number
  owner?: string
  name: string
  description?: string
  image?: string
  symbol?: string
  collectionName?: string
  oracle?: string
  statusDescription?: string
  taxonId?: string
  tokenId?: string
  tokenURI?: string
  geometry?: string
  conservationStatus?: number
}
