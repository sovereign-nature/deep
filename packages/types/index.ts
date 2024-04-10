export type DeepAsset = {
  id: string; //TODO: Do we need id?
  tokenId: string;
  name: string;
  description: string;
  image: string;
  animation_url?: string;
  collection: {
    id: string;
    name: string;
  };
  address: string; //TODO: Rename to assetDID
};
