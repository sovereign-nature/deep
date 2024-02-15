export type DirectusAsset = {
  data: {
    id: string;
    name: string;
    description: string;
    image: string;
    collection: {
      id: string;
      name: string;
      description: string;
    };
  };
};

export type OpenSeaNFTResponse = {
  nft: {
    identifier: string;
    name: string;
    description: string;
    image_url: string;
  };
};

export type OpenSeaCollectionResponse = {
  collection: string;
  name: string;
};

export type OpenSeaResponse = OpenSeaNFTResponse & {
  collection: OpenSeaCollectionResponse;
};

export type PolkadotResponse = {
  nftEntity: {
    id: string;
    sn: string;
    meta: {
      name: string;
      description: string;
      image: string;
    };
    collection: {
      id: string;
      name: string;
    };
  };
};

export type DeepAsset = {
  id: string;
  tokenId: string;
  name: string;
  description: string;
  image: string;
  collection: {
    id: string;
    name: string;
  };
  address?: string;
};
