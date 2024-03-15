<script lang="ts">
  import { getChainName } from '@sni/address-utils';
  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  import RolloverBtn from '$lib/shared/components/RolloverBtn.svelte';
  import ArbitrumIcon from '$lib/components/icons/ArbitrumIcon.svelte';
  import ConnectIcon from '$lib/components/icons/ConnectIcon.svelte';
  import { getWeb3Modal } from '$lib/features/web3Modal';

  let isLoaded = false;
  export let alwaysOpen = false;

  const web3Connected: Writable<boolean> = getContext('web3Connected');
  const web3Address: Writable<string> = getContext('web3Address');
  const web3ChainId: Writable<number> = getContext('web3ChainId');

  function openModal() {
    getWeb3Modal().open();
  }

  //TODO: Move to utils
  function shortenAddress(address: string) {
    return address.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
  }

  onMount(async () => {
    isLoaded = true;
  });
</script>

{#if isLoaded}
  {#if $web3Connected}
    {#key $web3Address || $web3ChainId}
      <!-- TODO: Check if click assigned correctly -->
      <button
        class=" dark:text-primary-200 pe-1 opacity-80 hover:opacity-100 active:opacity-100 flex items-center gap-2"
        on:click={openModal}
        >{#key $web3ChainId}
          {#if $web3ChainId == 42161}
            <ArbitrumIcon className="h-4 w-4" />
            <span class="sr-only">Arbitrum</span>
          {:else}
            {getChainName($web3ChainId)}
          {/if}
        {/key}
        <span class="flex items-center gap-2">
          <span class="rounded-full h-3 w-3 block bg-primary-300"></span>
          {shortenAddress($web3Address)}
        </span>
      </button>
    {/key}
  {:else}
    <RolloverBtn
      type="primary"
      keepOpen={alwaysOpen}
      on:click={() => openModal()}
    >
      Connect your wallet
      <ConnectIcon slot="icon" className="h-4 w-4 mx-1" />
    </RolloverBtn>
  {/if}
{/if}
