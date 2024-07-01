import { it, expect } from 'vitest';
import { UniqueNFTResponseSchema } from './schemas';
import { UniqueNFTResponse } from './fixtures';

it('Should be able to parse schema', () => {
  expect(UniqueNFTResponseSchema.parse(UniqueNFTResponse));
});
