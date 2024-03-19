<script lang="ts">
  import Fuse, { type FuseResult } from 'fuse.js';
  import { writable } from 'svelte/store';
  import { onMount, setContext } from 'svelte';
  import { directusUrl } from '@sni/clients/config';
  import { page } from '$app/stores';
  import type { DeepAsset } from '@sni/clients/assets-client/types';

  export let directusCollectionId: string;

  const url = $page.url;
  const searchParams = url.searchParams.get('search') || '';

  const fuseOptions = {
    keys: ['id', 'name', 'collection'],
  };
  const fuseSearch = new Fuse(Array<DeepAsset>(), fuseOptions);

  const web2DataState = {
    data: Array<DeepAsset>(),
    loaded: false,
    error: false,
  };

  // Create a store
  const web2Data = writable(web2DataState);
  const results = writable(Array<FuseResult<DeepAsset>>());
  const search = writable(searchParams);

  // Make them available to child components
  setContext('web2data', web2Data);
  setContext('search', search);
  setContext('results', results);

  //whenever the search is updated, run necessary function
  $: $search, handleSearch();

  // handle initial data load & initialize search via Fuse
  function handleDataLoaded(data: DeepAsset[], error = false) {
    if (!error) {
      web2Data.set({ data, loaded: true, error: false });
      fuseSearch.setCollection($web2Data.data);
      if ($search) {
        updateResults();
      }
    } else {
      web2Data.set({
        data,
        loaded: true,
        error: true,
      });
    }
  }

  function handleSearch() {
    if (!$web2Data.loaded) return;
    updateResults();
  }
  function updateResults() {
    let getFuseResults = fuseSearch.search($search);
    results.update(() => getFuseResults);
  }

  onMount(async () => {
    try {
      const response = await fetch(
        `${directusUrl}/items/${directusCollectionId}?filter[status][_eq]=published`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      handleDataLoaded(data.data);
    } catch (e) {
      handleDataLoaded([], true);
      console.error((e as Error).message);
    }
  });
</script>

<slot />
