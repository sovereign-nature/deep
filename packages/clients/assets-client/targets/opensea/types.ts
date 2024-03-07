type OpenSeaNFTResponse = {
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
