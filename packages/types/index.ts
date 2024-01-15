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
  //TODO: Check if address is used everywhere
  address?: string;
};
