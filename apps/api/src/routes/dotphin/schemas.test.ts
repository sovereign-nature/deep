import { it, expect } from 'vitest';
import { CFImageUploadResponseSchema } from './schemas';

const imagesResponse = {
  result: {
    id: '33470ee2-9f4b-4de0-9857-de5b2112e800',
    filename: 'tmp-dotphin-evolution.png',
    uploaded: '2024-10-18T13:57:58.517Z',
    requireSignedURLs: false,
    variants: [
      'https://imagedelivery.net/TbEOGfUBcfmfflqdtuuZVA/33470ee2-9f4b-4de0-9857-de5b2112e800/square300px',
      'https://imagedelivery.net/TbEOGfUBcfmfflqdtuuZVA/33470ee2-9f4b-4de0-9857-de5b2112e800/dotphin2560',
      'https://imagedelivery.net/TbEOGfUBcfmfflqdtuuZVA/33470ee2-9f4b-4de0-9857-de5b2112e800/public',
    ],
  },
  success: true,
  errors: [],
  messages: [],
};

it('Should be able to parse image response schema', () => {
  expect(CFImageUploadResponseSchema.parse(imagesResponse));
});
