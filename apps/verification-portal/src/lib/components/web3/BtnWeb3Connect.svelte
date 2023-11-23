<script lang="ts">
  import { getWeb3Modal } from '$lib/web3Modal';
  import { getContext } from 'svelte';
  import ConnectIcon from '$lib/components/icons/ConnectIcon.svelte';
  import ArbitrumIcon from '$lib/components/icons/ArbitrumIcon.svelte';
  import { onMount } from 'svelte';
  const web3Modal = getWeb3Modal();
  let isLoaded = false;

  const web3Connected = getContext('web3Connected');
  const web3Address = getContext('web3Address');
  const web3ChainId = getContext('web3ChainId');

  function openModal() {
    web3Modal.open();
  }
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
      <button
        class="text-gray-300 dark:text-primary-500 text-sm pe-1 opacity-80 hover:opacity-100 active:opacity-100 flex items-center gap-2"
        on:click={openModal}
        >{#key $web3ChainId}
          {#if $web3ChainId == 42161}
            <ArbitrumIcon className="h-4 w-4" />
            <span class="sr-only">Arbitrum</span>
          {:else if $web3ChainId == 137}
            Polygon
          {:else if $web3ChainId == 80001}
            Mumbai
          {:else if $web3ChainId == 4}
            Rinkeby
          {:else if $web3ChainId == 3}
            Ropsten
          {:else if $web3ChainId == 5}
            Goerli
          {:else if $web3ChainId == 42}
            Kovan
          {:else if $web3ChainId == 1}
            Mainnet
          {:else}
            Unknown
          {/if}
        {/key}
        {shortenAddress($web3Address)}
      </button>
    {/key}
  {:else}
    <button
      class="bg-primary-400 rounded-full text-white text-sm opacity-50 hover:opacity-100 active:opacity-100 w-8 h-8 flex justify-center items-center"
      on:click={openModal}
    >
      <ConnectIcon className="h-4 w-4" />
    </button>
  {/if}
{/if}
