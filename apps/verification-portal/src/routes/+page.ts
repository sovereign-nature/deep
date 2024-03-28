import type { DeepAsset } from '@sni/types';
import { deepApiUrl } from '@sni/clients/config';
import { writable } from 'svelte/store'; // Make sure to import writable from svelte/store
import { tabConfig } from '$lib/shared/collectionsConfig';

// Create a Svelte store for the highlights
const highlightsStore = writable<{ [key: string]: DeepAsset[] }>({});

export const load = async ({ fetch, url }) => {
  const collection = url.searchParams.get('q')
    ? url.searchParams.get('q')
    : tabConfig.activeKey;

  let highlights: DeepAsset[] = [];

  highlightsStore.subscribe((store) => {
    if (collection) {
      highlights = store[collection];
    }
  });

  if (!highlights) {
    const highlightsResponse = await fetch(
      `${deepApiUrl}/highlights/${collection}`
    );

    highlights = [];

    if (highlightsResponse.ok) {
      highlights = await highlightsResponse.json();
    }
    if (collection) {
      highlightsStore.update((store) => ({
        ...store,
        [collection]: highlights,
      }));
    }
  } else {
    console.log('collection is pre-fetched');
  }

  return { highlights };
};
