import { HttpResponse, http } from 'msw';
import { rateLimitedUniqueWallet, uniqueWalletNFTs } from './fixtures';

export const uniqueAccountTokensHandler = http.get(
  uniqueWalletNFTs.url,
  ({ request }) => {
    const url = new URL(request.url);

    const address = url.searchParams.get('address');
    const collectionId = url.searchParams.get('collectionId');

    if (address === 'limited') {
      console.log('Mocking');
      return HttpResponse.json(rateLimitedUniqueWallet.payload, {
        status: 429,
      });
    }

    if (
      address === '0xb8a976ad1d87d070b5e5806b98a768b4bb4e4847' &&
      collectionId === '3019'
    ) {
      return HttpResponse.json(uniqueWalletNFTs.payload);
    }
  }
);
