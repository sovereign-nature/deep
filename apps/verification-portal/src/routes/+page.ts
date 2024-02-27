import type { DeepAsset } from '@sni/clients/assets-client/types';

export const load = async ({ fetch, url }) => {
  let collection = url.searchParams.get('q');

  if (!collection) collection = 'soundwaves'; //TODO: Should be default url, this fix should be removed

  const highlightsResponse = await fetch(
    `https://web3-highlights.sovereign.workers.dev/${collection}`
  );

  let highlights: DeepAsset[] = [];

  if (highlightsResponse.ok) {
    highlights = await highlightsResponse.json();
  }

  return { highlights };
};
