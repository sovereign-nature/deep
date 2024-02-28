<script lang="ts">
  import axios from 'axios';
  import type { AxiosResponse } from 'axios';
  import Fuse, { type FuseResult } from 'fuse.js';
  import { writable } from 'svelte/store';
  import { onMount, setContext } from 'svelte';
  import { directusUrl } from '@sni/clients/config';
  import { page } from '$app/stores';
  import { shuffleArray } from '$lib/shared/utils';
  import type { DeepAsset } from '@sni/clients/assets-client/types';

  export let campaign = 'hotel_hideaway';

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
  const featured = writable();

  // Make them available to child components
  setContext('web2data', web2Data);
  setContext('search', search);
  setContext('results', results);
  setContext('featured', featured);

  //whenever the search is updated, run necessary function
  $: $search, handleSearch();

  // handle initial data load & initialize search via Fuse
  function handleDataLoaded(data: DeepAsset[], error = false) {
    if (!error) {
      web2Data.set({ data, loaded: true, error: false });
      fuseSearch.setCollection($web2Data.data);
      setFeatured();
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

  function setFeatured() {
    if ($web2Data.data.length > 0) {
      try {
        let itemsCopy = [...$web2Data.data];
        let randomItems = shuffleArray(itemsCopy).slice(0, 3);
        featured.set(addAddressToItems(randomItems));
      } catch (e) {
        console.error((e as Error).message);
      }
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
      //TODO: Remove axios and migrate to fetch
      const { data: response }: AxiosResponse = await axios.get(
        `${directusUrl}/items/${campaign}?filter[status][_eq]=published` //TODO: move to directus client
      );
      handleDataLoaded(response.data);
    } catch (e) {
      handleDataLoaded([], true);
      console.error((e as Error).message);
    }
  });

  //TODO: Should be on server and parametrized (now HH hardcoded)
  function addAddressToItems(items: DeepAsset[]): DeepAsset[] {
    const updatedItems = items.map((item) => {
      //TODO: Address shouldn't be hardcoded
      const address = `did:asset:deep:hotel-hideaway.asset:${item.id}`; // Combine the string with existing id
      return { ...item, address }; // Create a new object with the updated address property
    });
    return updatedItems;
  }
</script>

<slot />
