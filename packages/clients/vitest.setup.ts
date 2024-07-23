import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { HttpResponse, graphql, http } from 'msw';
import { crossmintWalletNFTs } from './wallets-client/targets/crossmint/mocks';
import { uniqueWalletNFTs } from './wallets-client/targets/unique/mocks';

export const restHandlers = [
  // Mocking a REST API for Crossmint get NFTs from wallet
  http.get(crossmintWalletNFTs.url, () => {
    return HttpResponse.json(crossmintWalletNFTs.payload);
  }),

  http.get(uniqueWalletNFTs.url, () => {
    return HttpResponse.json(uniqueWalletNFTs.payload);
  }),
];

const graphqlHandlers = [
  graphql.query('ListPosts', () => {
    return HttpResponse.json({
      data: { posts: crossmintWalletNFTs },
    });
  }),
];

//From https://vitest.dev/guide/mocking.html#requests
const server = setupServer(...restHandlers, ...graphqlHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' })); //TODO: Switch to 'error' for strict mode after all mocks are implemented

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
