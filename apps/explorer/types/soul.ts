import SoulProperty from '~/types/soul-property'

export interface Soul {
  id: string
  status: number,
  createdTimestamp: number,
  updatedTimestamp: number,
  owner?: string,
  name: string,
  description?: string,
  image?: string,
  properties?: SoulProperty
  symbol?: string,
  collectionName?: string,
  oracle?: string
}
