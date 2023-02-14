export interface Metadata {
  image: string;
  name: string;
  attributes: Attributes[];
  description: string;
}

export interface Attributes {
  trait_type: string;
  value: string;
}
