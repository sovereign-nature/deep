<script lang="ts">
  import FeaturedContainer from '$lib/containers/FeaturedContainer.svelte';
  import Web3Featured from '$lib/data/Web3Featured.json';
  import type { AssetFeatured } from '$lib/types';
  import { shuffleArray } from '$lib/utils';
  import { getContext } from 'svelte';

  // Shuffle the items array and select the first 3 items
  let randomItems: AssetFeatured[] = shuffleArray(Web3Featured).slice(0, 3);
  let web3Items: AssetFeatured[] = [];
  let web3Connected = getContext('web3Connected');
  let web3Address = getContext('web3Address');

  // Reactively update web3 assets when web3Connected or web3Address changes
  $: $web3Connected, getWeb3Assets();
  $: $web3Address, getWeb3Assets();

  async function getWeb3Assets() {
    if ($web3Connected) {
      try {
        const response = await fetch(
          `/api/opensea?collection=real-test-1&address=${$web3Address}`
        );

        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        web3Items = data;
        console.log(web3Items);
      } catch (error) {
        console.error(error.message);
      }
    }
  }
</script>

{#key $web3Connected}
  {#if $web3Connected && web3Items.length > 0}
    <FeaturedContainer featuredItems={web3Items} />
  {:else}
    <FeaturedContainer featuredItems={randomItems} />
  {/if}
{/key}
