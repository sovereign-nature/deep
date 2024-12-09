<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';
  import EvolutionCard from '$lib/widgets/DOTphin/Steps/CardEvolution.svelte';
  import ProofCard from '$lib/widgets/DOTphin/Steps/CardProof.svelte';
  import NFTCard from '$lib/widgets/DOTphin/Steps/CardNFT.svelte';
  import { Timeline } from 'flowbite-svelte';
  import Spinner from '$lib/components/icons/Spinner.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import CollectModal from '$lib/widgets/DOTphin/CollectForm/CollectModal.svelte';

  import {
    multipassData,
    nftStepState,
    evolveStepState,
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
    $multipassData.nft.pending ? 'pt-8 sm:pt-4' : 'pt-6 sm:pt-8'
  } bg-deep-green dark:bg-black dark:bg-opacity-60 text-white rounded-b-lg ps-6 sm:p-16 overflow-x-auto mb-8`}
>
  {#if $multipassData.nft.pending}
    <div
      class="flex text-[15px] whitespace-pre-line max-w-fit gap-x-4 items-center font-aeonik mb-4 sm:mb-8 text-gray-200 p-2 px-5 bg-black dark:bg-deep-green-800 rounded-lg me-6"
    >
      <Spinner className=" w-5 h-5 text-primary-200  fill-primary-400 "
      ></Spinner>
      {#if $evolveStepState === 'EVOLVING'}
        <span> {$LL.multipass.pendingEvolve()}</span>
      {:else}
        <span> {$LL.multipass.pendingCollect()}</span>
      {/if}
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

{#if $nftStepState === 'UNCLAIMED' || $evolveStepState === 'INITIAL' || $evolveStepState === 'EVOLVING'}
  <CollectModal />
{/if}
