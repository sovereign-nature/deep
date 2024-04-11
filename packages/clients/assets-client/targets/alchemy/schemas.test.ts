import { it, expect } from 'vitest';
import { AlchemyResponseSchema } from './schemas';
import { AlchemyNFTResponse } from './fixtures';

it('Should be able to parse schema', () => {
  expect(AlchemyResponseSchema.parse(AlchemyNFTResponse));
});
