export type DeepAsset = {
  id: string; //TODO: Do we need id?
  tokenId: string;
  name: string;
  description: string;
  image: string;
  collection: {
    id: string;
    name: string;
  };
  address: string; //TODO: Rename to did
};
