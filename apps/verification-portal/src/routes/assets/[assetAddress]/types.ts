import type { GeoJsonObject } from 'geojson';

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

export type NftAsset = {
  id: string;
  sn: string;
  collection: object;
  meta: { name: string; image: string; description: string };
};

export type NftResponse = {
  nftEntity?: NftAsset | null;
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
