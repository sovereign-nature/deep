<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';
  import { Button, ButtonGroup, Input } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import ConnectIcon from '$lib/components/icons/ConnectIcon.svelte';
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
  import ArrowRight from '$lib/components/icons/ArrowRight.svelte';
  export let collectionKey = 'sub0';
  export let placeholder = 'Enter the token ID (1-1466)';
  export let goIcon = false;
  export let inputmode = 'text';
  export let web3enabled = false;
  export let searchEnabled = true;

  import Web3ConnectBtn from '$lib/widgets/ButtonWalletConnect/Web3ConnectBtn.svelte';

  let showButton = false;
  const web3Connected: Writable<boolean> = getContext('web3Connected');

  onMount(() => {
    showButton = true;
  });
</script>

<div
  class="flex flex-col md:flex-row md:items-center gap-3 lg:px-16 pt-4 sm:pt-6"
>
  <div
    class="flex gap-2 items-baseline justify-end text-white whitespace-nowrap mr-auto text-sm sm:text-base w-full sm:w-auto md:w-1/2 pe-5 mb-3 md:mb-0"
  >
    {#if web3enabled}
      {#if showButton}
        {#if $web3Connected}
          <span class="ms-3">Connected to</span>
        {/if}
        <!-- <w3m-button size="sm"> </w3m-button> -->
        <Web3ConnectBtn alwaysOpen></Web3ConnectBtn>
        {#if !$web3Connected}
          <span class="ms-3">or</span>
        {:else}
          <span class="ms-auto"></span>
        {/if}
      {/if}
    {:else}
      Wallet <Button color="none" size="sm" class="bg-primary-300" disabled
        >connect <ConnectIcon className="h-4 w-4 ms-2" /></Button
      > <span>coming soon</span>
    {/if}
  </div>
  <form class="w-full sm:w-auto md:w-1/2" method="POST" use:enhance>
    <input
      name="collection"
      value={collectionKey}
      type="text"
      readonly
      hidden
    />
    <ButtonGroup
      divClass="w-full flex flex-col sm:flex-row sm:inline-flex  justify-items-stretch gap-y-4  sm:flex-row sm:inline-flex  justify-items-stretch gap-y-4 "
    >
      <Input
        id="default-search"
        class="block border-none w-full border p-4 pl-10 text-sm sm:text-base font-aeonik text-gray-200 focus:border-white focus:ring-white dark:placeholder:text-primary-300 dark:bg-deep-green-700 rounded-sm !rounded-l-sm sm:rounded-none  ms-auto"
        name="search"
        type="search"
        {placeholder}
        required
        {inputmode}
        disabled={!searchEnabled}
        title={!searchEnabled ? 'Coming soon' : ''}
      />

      <Button
        color="none"
        class="bg-primary-300 sm:w-20 border-none !p-2.5 rounded-lg sm:rounded-s-none  ms-auto sm:!rounded-r-sm"
        type="submit"
        aria-label="search"
        formaction="/?/formSearch"
        disabled={!searchEnabled}
      >
        {#if goIcon}
          <ArrowRight className="h-4 w-4 sm:h-7 sm:w-7" />
        {:else}
          <SearchIcon className="h-4 w-4 sm:h-7 sm:w-7" />
        {/if}
      </Button>
    </ButtonGroup>
  </form>
</div>
