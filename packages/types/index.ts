export type DeepAsset = {
  id: string; //TODO: Do we need id?
  tokenId: string;
  name: string;
  description: string;
  image: string;
  animation_url?: string;
  collection: {
    id: string; //TODO: Stores collection address. Do we need to name it id? Rename to contractAddress or collectionAddress?
    name: string; //TODO: Do we need name?
    //TODO: Optional collection description?
  };
  multipass: {
    name: string;
    infoLink: string | undefined;
  };
  address: string; //TODO: Rename to assetDID?
};

export class ExternalApiError extends Error {}
export type EvmAddress = `0x${string}`; //TODO Try to use it in code
