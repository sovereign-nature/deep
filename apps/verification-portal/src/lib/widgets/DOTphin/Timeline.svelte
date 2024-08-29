<script lang="ts">
  import EvolutionCard from './Steps/CardEvolution.svelte';
  import ProofCard from './Steps/CardProof.svelte';
  import NFTCard from './Steps/CardNFT.svelte';
  import { Timeline } from 'flowbite-svelte';

  import { state } from './MultipassStates';
  export let order: 'horizontal' | 'vertical' = 'horizontal';
</script>

<div
  class="bg-deep-green dark:bg-black dark:bg-opacity-60 text-white rounded-b-lg ps-6 pt-8 sm:p-16 overflow-x-auto mb-8"
>
  <Timeline {order}>
    {#if $state.nft.claimed}
      <NFTCard />
    {/if}
    <ProofCard />
    {#if !$state.nft.claimed}
      <NFTCard />
    {/if}
    <EvolutionCard />
  </Timeline>
</div>
