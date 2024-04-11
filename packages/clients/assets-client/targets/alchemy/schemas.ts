import { z } from 'zod';

export const AlchemyResponseSchema = z.object({
  contract: z.object({
    address: z.string(),
    name: z.string(),
    symbol: z.string(),
    totalSupply: z.string(),
    tokenType: z.string(), //TODO: Enum
    contractDeployer: z.string().nullable(), //TODO: Address filter
    deployedBlockNumber: z.number().nullable(),

    openSeaMetadata: z.object({
      floorPrice: z.number().nullable(),
      collectionName: z.string().nullable(),
      collectionSlug: z.string().nullable(),
      safelistRequestStatus: z.string().nullable(),
      imageUrl: z.string().nullable(),
      description: z.string().nullable(),
      externalUrl: z.string().nullable(),
      twitterUsername: z.string().nullable(),
      discordUrl: z.string().nullable(),
      bannerImageUrl: z.string().nullable(),
      lastIngestedAt: z.string().nullable(), //TODO: Date
    }),

    isSpam: z.boolean().nullable(),
    spamClassifications: z.array(z.string()),
  }),

  tokenId: z.string(),
  tokenType: z.string(), //TODO: Enum
  name: z.string(),
  description: z.string(),
  tokenUri: z.string(),
  image: z.object({
    cachedUrl: z.string(),
    thumbnailUrl: z.string().nullable(),
    pngUrl: z.string().nullable(),
    contentType: z.string().nullable(),
    size: z.number().nullable(),
    originalUrl: z.string(),
  }),
  raw: z.object({
    tokenUri: z.string(),
    metadata: z.object({
      name: z.string(),
      description: z.string(),
      image: z.string(),
    }),
    error: z.string().nullable(),
  }),
  mint: z.object({
    mintAddress: z.string().nullable(),
    blockNumber: z.number().nullable(),
    timestamp: z.number().nullable(), //TODO: Check format
    transactionHash: z.string().nullable(),
  }),
  owners: z.array(z.string()),
  timeLastUpdated: z.string(), //TODO: Date
});
