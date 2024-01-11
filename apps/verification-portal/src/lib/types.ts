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
  tokenId: number | string;
  name: string;
  description: string;
  image: string;
  collection: { id: string; name: string; description: string };
};
export type AssetFeatured = {
  id: string;
  tokenId: number | string;
  name: string;
  description: string;
  image: string;
  collection: { id: string; name: string };
  address: string;
};

export type NameValue = { name: string; value: number };

export type DeepData = {
  link?: VerifiedResponse;
  steward: {
    id: string;
    funds_raised: number;
    name: string;
    description: string;
    area: GeoJsonObject;
    images: Array<DirectusImage>;
    website: string;
  };
  sound: {
    id: string;
    filename_disk: string;
    filename_download: string;
  };
  news: Array<NewsEntity>;
  images: Array<DirectusImage>;
  id: string;
  location: GeoJsonObject;
  description: string;
  name: string;
  statistics: Array<NameValue>;
};

export type Address = {
  scheme: string;
  didMethod: string;
  chain: {
    namespace: string;
    reference: string;
  };
  asset: {
    namespace: string;
    reference: string;
    identifier: number;
  };
};

export type NewsEntity = {
  id: number;
  status: string;
  sort?: null;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  title: string;
  date: string;
  content: string;
  image: string;
  steward: string;
};

export type Web2DataState = {
  data: [];
  loaded: boolean;
  error: boolean;
};
export type Web3DataState = {
  loaded: boolean;
  error: boolean;
};

export type CollectionKey = 'sub0' | 'hh';

export type FeaturesConfig = {
  [key: string]: boolean;
};
