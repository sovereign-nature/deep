export type DeepAsset = {
  id: string; //TODO: DeepAsset should have id as number. Do we need id?
  tokenId: string; //TODO: DeepAsset should have tokenId as number
  name: string;
  description: string;
  image: string;
  collection: {
    id: string;
    name: string;
  };
  address: string; //TODO: Rename to did
};
