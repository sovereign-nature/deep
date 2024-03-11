export type MoonSamaToken = {
  id: string;
  numericId: string;
  address: string;
  metadata: { name: string; description: string; image: string };
};

export type MoonSamaResponse = { tokens: MoonSamaToken[] };
