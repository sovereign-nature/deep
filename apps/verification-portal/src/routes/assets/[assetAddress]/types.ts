import type { GeoJsonObject } from 'geojson';
//TODO: Try to autogenerate this file from the API
export type DirectusImage = {
  directus_files_id: string;
};

export type VerifiedResponse = {
  id: string;
  steward_id: string;
  entity_id: string;
  collection_id: string;
  funds_raised: number;
};

export type Asset = {
  id: string;
  tokenId: number;
  name: string;
  description: string;
  image: string;
  collection: { id: string; name: string; description: string };
};

export type DeepData = {
  link?: VerifiedResponse;
  steward: {
    funds_raised: number;
    name: string;
    description: string;
    area: GeoJsonObject;
    images: Array<DirectusImage>;
  };
  images: Array<DirectusImage>;
  id: string;
  location: GeoJsonObject;
  description: string;
  name: string;
};
