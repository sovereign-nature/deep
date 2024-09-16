export type DeepAsset = {
  id: string; //TODO: Do we need id?
  tokenId: string;
  name: string;
  description: string;
  image: string;
  animation_url?: string;
  collection: {
    id: string; //TODO: Stores collection address. Do we need to name it id? Rename to contractAddress or collectionAddress?
    name?: string;
    description?: string;
  };
  attributes?: Array<{ trait_type: string; value: string }>;
  multipass?: {
    name: string;
    infoLink: string | undefined; //TODO: Mark as optional?
  };
  address: string; //TODO: Rename to assetDID?
  owner: string;
};

//TODO: This is not a type, probably should be moved to another library
export class ExternalApiError extends Error {}

export type EvmAddress = `0x${string}`; //TODO Try to use it in code

export type UniqueNetwork = 'unique' | 'opal';
