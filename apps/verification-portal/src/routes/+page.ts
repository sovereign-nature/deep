import type { DeepAsset } from '@sni/clients/assets-client/types';
import { deepApiUrl } from '@sni/clients/config';

export const load = async ({ fetch, url }) => {
  let collection = url.searchParams.get('q');

  if (!collection) collection = 'soundwaves'; //TODO: Should be default url, this fix should be removed

  const highlightsResponse = await fetch(
    `${deepApiUrl}/highlights/${collection}`
  );

  let highlights: DeepAsset[] = [];

  if (highlightsResponse.ok) {
    highlights = await highlightsResponse.json();
  }

  return { highlights };
};
