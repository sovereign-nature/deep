<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import type { DeepAsset } from '@sni/types';
  import type { Web3DataState } from '$lib/types';
  import { deepApiUrl } from '@sni/clients/config';

  export let collectionAddress: string;
  export let web3Enabled = false;

  const web3DataState: Web3DataState = {
    loaded: false,
    error: false,
  };

  let items: DeepAsset[] = [];
  let web3Items = writable(items);
  const web3Response = writable(web3DataState);

  let web3Connected: Writable<boolean> = getContext('web3Connected'); //TODO: Refactor stores, remove contexts
  let web3Address: Writable<string> = getContext('web3Address');

  setContext('web3Items', web3Items);
  setContext('web3Response', web3Response);
  setContext('web3Assets', getWeb3Assets);

  // Reactively update web3 assets when web3Connected or web3Address changes
  $: $web3Connected, getWeb3Assets();
  $: $web3Address, getWeb3Assets();

  async function getWeb3Assets() {
    if ($web3Connected && web3Enabled) {
      web3Response.set({ loaded: false, error: false });
      try {
        const response = await fetch(
          `${deepApiUrl}/wallets/${$web3Address}?assetDID=${collectionAddress}`
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        web3Items.set(data);
        web3Response.set({ loaded: true, error: false });
      } catch (e) {
        console.error((e as Error).message);
        web3Response.set({ loaded: true, error: true });
      }
    }
  }
</script>

<slot />
