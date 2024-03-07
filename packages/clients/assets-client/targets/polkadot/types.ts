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
