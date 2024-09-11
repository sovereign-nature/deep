<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';
  import EvolutionCard from '$lib/widgets/DOTphin/Steps/CardEvolution.svelte';
  import ProofCard from '$lib/widgets/DOTphin/Steps/CardProof.svelte';
  import NFTCard from '$lib/widgets/DOTphin/Steps/CardNFT.svelte';
  import { Timeline } from 'flowbite-svelte';
  import { multipassData, nftStepState } from '$lib/features/MultipassStates';
  import { updateMultipassStateForAddress } from '$lib/features/DOTphin';
  const web3Connected: Writable<boolean> = getContext('web3Connected');
  const web3Address: Writable<string> = getContext('web3Address');

  export let order: 'horizontal' | 'vertical' = 'horizontal';
  $: {
    if ($web3Connected) {
      $multipassData.isLoggedIn = true;
      console.log('User is logged in');
    } else {
      $multipassData.isLoggedIn = false;
      console.log('User is logged out');
    }
  }

  // Reactive statement to update multipass state when web3Address changes
  $: {
    if ($web3Address) {
      updateMultipassStateForAddress($web3Address);
      console.log('Multipass state updated for address:', $web3Address);
    }
  }
</script>

<div
  class="bg-deep-green dark:bg-black dark:bg-opacity-60 text-white rounded-b-lg ps-6 pt-8 sm:p-16 overflow-x-auto mb-8"
>
  <Timeline {order}>
    {#if $nftStepState === 'CLAIMED'}
      <NFTCard />
    {/if}
    <ProofCard />
    {#if $nftStepState !== 'CLAIMED'}
      <NFTCard />
    {/if}
    <EvolutionCard />
  </Timeline>
</div>
