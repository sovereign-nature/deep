export interface Metadata {
  image?: string;
  name?: string;
  description?: string;
  attributes: Attributes[];
  properties: Properties;
}

export interface Properties {
  taxonId: string;
  statusDescription: string;
  geometry: string;
  conservationStatus: string;
}
export interface Attributes {
  trait_type: string;
  value: string;
}
