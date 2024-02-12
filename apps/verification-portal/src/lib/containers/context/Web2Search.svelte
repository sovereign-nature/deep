<script lang="ts">
  import axios from 'axios';
  import type { AxiosResponse } from 'axios';
  import Fuse from 'fuse.js';
  import { writable } from 'svelte/store';
  import { onMount, setContext } from 'svelte';
  import { SNI_DIRECTUS_URL } from '@sni/constants';
  import { page } from '$app/stores';
  export let campaign = 'hotel_hideaway';
  import type { AssetFeatured, Web2DataState } from '$lib/types';
  import { shuffleArray } from '$lib/shared/utils';

  const url = $page.url;
  const searchParams = url.searchParams.get('search') || '';

  const fuseOptions = {
    keys: ['id', 'name', 'collection'],
  };
  const fuseSearch = new Fuse([], fuseOptions);

  const web2DataState: Web2DataState = {
    data: [],
    loaded: false,
    error: false,
  };

  // Create a store
  const web2Data = writable(web2DataState);
  const results = writable([]);
  const search = writable(searchParams);
  const featured = writable();

  // Make them available to child components
  setContext('web2data', web2Data);
  setContext('search', search);
  setContext('results', results);
  setContext('featured', featured);

  //whenever the search is updated, run necessary function
  $: $search, handleSearch();

  // handle initial data load & initize search via Fuse
  function handleDataLoaded(data: [], error = false) {
    if (!error) {
      web2Data.set({ data, loaded: true, error: false });
      fuseSearch.setCollection($web2Data.data);
      setFeatured();
      if ($search) {
        updateResults();
      }
    } else {
      web2Data.set({ data, loaded: true, error: true });
    }
  }

  function setFeatured() {
    if ($web2Data.data.length > 0) {
      try {
        let itemsCopy = [...$web2Data.data];
        let randomItems = shuffleArray(itemsCopy).slice(0, 3);
        featured.set(addAddressToItems(randomItems));
      } catch (e) {
        console.log('did load featured');
      }
    }
  }

  function handleSearch() {
    if (!$web2Data.loaded) return;
    updateResults();
  }
  function updateResults() {
    let getFuseResults: [] = fuseSearch.search($search);
    results.update(() => getFuseResults);
  }
  function addAddressToItems(items: AssetFeatured[]): AssetFeatured[] {
    const updatedItems = items.map((item) => {
      const address = `did:asset:deep:hotel-hideaway.asset:${item.id}`; // Combine the string with existing id
      return { ...item, address }; // Create a new object with the updated address property
    });
    return updatedItems;
  }

  onMount(async () => {
    try {
      const { data: response }: AxiosResponse = await axios.get(
        `${SNI_DIRECTUS_URL}/items/${campaign}?filter[status][_eq]=published` //TODO: move to directus client
      );
      handleDataLoaded(response.data);
    } catch (error) {
      handleDataLoaded([], true);
      if (axios.isAxiosError(error)) {
        // Axios error (e.g., network error, timeout)
        if (error.code === 'ECONNABORTED') {
          // Timeout error
          console.error('Request timed out');
        } else {
          // Other Axios errors
          console.error('Axios error:', error.message);
        }
      } else {
        // Non-Axios error (e.g., server error)
        console.error('Error:', error.message);
      }
    }
  });
</script>

<slot />
