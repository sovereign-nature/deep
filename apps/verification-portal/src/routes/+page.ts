import type { DeepAsset } from '@sni/clients/assets-client/types';
import { deepApiUrl } from '@sni/clients/config';
import { tabConfig } from '$lib/shared/collectionsConfig';

export const load = async ({ fetch, url }) => {
  let collection = url.searchParams.get('q');

  if (!collection) collection = tabConfig.activeKey;
  const highlightsResponse = await fetch(
    `${deepApiUrl}/highlights/${collection}`
  );

  let highlights: DeepAsset[] = [];

  if (highlightsResponse.ok) {
    highlights = await highlightsResponse.json();
  }

  return { highlights };
};
