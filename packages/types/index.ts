export type DeepAsset = {
  id: string; //TODO: Do we need id?
  tokenId: string;
  name: string;
  description: string;
  image: string;
  animation_url?: string;
  collection: {
    id: string; //TODO: Do we need id?
    name: string;
    //TODO: Optional collection description?
  };
  address: string; //TODO: Rename to did?
};
