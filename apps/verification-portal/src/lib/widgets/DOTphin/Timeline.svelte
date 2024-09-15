<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';
  import EvolutionCard from '$lib/widgets/DOTphin/Steps/CardEvolution.svelte';
  import ProofCard from '$lib/widgets/DOTphin/Steps/CardProof.svelte';
  import NFTCard from '$lib/widgets/DOTphin/Steps/CardNFT.svelte';
  import { Timeline } from 'flowbite-svelte';
  import Spinner from '$lib/components/icons/Spinner.svelte';

  import {
    multipassData,
    nftStepState,
    resetData,
  } from '$lib/features/MultipassStates';
  import { updateMultipassStateForAddress } from '$lib/features/DOTphin';

  const web3Connected: Writable<boolean> = getContext('web3Connected');
  const web3Address: Writable<string> = getContext('web3Address');

  export let order: 'horizontal' | 'vertical' = 'horizontal';

  // Update login status based on web3 connection
  $: {
    if ($web3Connected) {
      $multipassData.isLoggedIn = true;
    } else {
      resetData();
    }
  }

  // Reactive statement to update multipass state when web3Address changes
  $: {
    if ($web3Address) {
      // Only update if the current address is different from the one already stored

      if ($web3Connected && $multipassData.address !== $web3Address) {
        updateMultipassStateForAddress($web3Address);
        console.log('Multipass state updated for address:', $web3Address);
      }
    }
  }
</script>

<div
  class={`${
    $multipassData.nft.pending ? 'pt-4 sm:pt-4' : 'pt-6 sm:pt-8'
  } bg-deep-green dark:bg-black dark:bg-opacity-60 text-white rounded-b-lg ps-6 sm:p-16 overflow-x-auto mb-8`}
>
  {#if $multipassData.nft.pending}
    <div
      class="flex gap-x-2 items-center font-serif mb-4 sm:mb-8 text-gray-200"
    >
      <span> Processing claim </span>
      <Spinner className=" w-5 h-5 text-primary-200  fill-primary-400 "
      ></Spinner>
    </div>
  {/if}
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
