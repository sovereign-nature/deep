// TODO: Replace with Zod schema.

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
