import type { DeepAsset } from '@sni/types';
import { deepApiUrl } from '@sni/clients/config';
import { writable } from 'svelte/store'; // Make sure to import writable from svelte/store
import { tabConfig, collections } from '$lib/shared/collectionsConfig';
import type { CollectionKeys } from '$lib/shared/collectionsConfig';

// Create a Svelte store for the highlights
const highlightsStore = writable<{ [key: string]: DeepAsset[] }>({});

export const load = async ({ url }) => {
  const collectionQuery = url.searchParams.get('q');
  const collection: CollectionKeys = collections
    .map((collection) => collection.key)
    .includes(collectionQuery as CollectionKeys)
    ? (collectionQuery as CollectionKeys)
    : tabConfig.activeKey;

  return {
    collectionKey: collection,
    streamed: {
      highlights: loadHighlights(collection),
    },
  };
};

async function loadHighlights(collection: CollectionKeys) {
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

  return highlights;
}
