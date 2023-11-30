<script lang="ts">
  import Web3Featured from '$lib/data/Web3Featured.json';
  import type { AssetFeatured, Web3DataState } from '$lib/types';
  import { shuffleArray } from '$lib/utils';
  import { getContext, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';

  export let collectionId: string;

  const web3DataState: Web3DataState = {
    loaded: false,
    error: false,
  };

  let items: AssetFeatured[] = [];
  let featured: AssetFeatured[] = shuffleArray(Web3Featured).slice(0, 3);
  let web3Items = writable(items);
  const web3Response = writable(web3DataState);

  let web3Connected: Writable<boolean> = getContext('web3Connected');
  let web3Address: Writable<string> = getContext('web3Address');

  setContext('web3Items', web3Items);
  setContext('web3Featured', featured);
  setContext('web3Response', web3Response);

  // Reactively update web3 assets when web3Connected or web3Address changes
  $: $web3Connected, getWeb3Assets();
  $: $web3Address, getWeb3Assets();

  async function getWeb3Assets() {
    if ($web3Connected) {
      web3Response.set({ loaded: false, error: false });
      try {
        const response = await fetch(
          `/api/opensea?collection=${collectionId}&address=${$web3Address}`
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        web3Items.set(data);
        web3Response.set({ loaded: true, error: false });
      } catch (error) {
        console.error(error.message);
        web3Response.set({ loaded: true, error: true });
      }
    }
  }
</script>

<slot />
