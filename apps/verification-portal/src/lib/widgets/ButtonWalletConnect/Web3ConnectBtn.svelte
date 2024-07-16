<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  import RolloverBtn from '$lib/shared/components/RolloverBtn.svelte';
  import ConnectIcon from '$lib/components/icons/ConnectIcon.svelte';
  import { getWeb3Modal } from '$lib/features/web3Modal';

  let isLoaded = false;
  export let alwaysOpen = false;
  export let responsive = false;

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
        class={`${responsive ? 'h-8 md:h-11 md:text-base text-xs px-3 md:px-5' : 'text-base h-11 px-5'} text-white dark:text-primary-200 hover:bg-primary-300   hover:dark:bg-deep-green-400 active:opacity-100 flex items-center gap-2 rounded-full bg-primary-400 dark:bg-deep-green-500`}
        type="button"
        on:click={openModal}
      >
        <span class="flex items-center gap-2">
          <span
            class="rounded-full h-3 w-3 block bg-deep-green-400 dark:bg-primary-200"
          ></span>
          {shortenAddress($web3Address)}
        </span>
      </button>
    {/key}
  {:else}
    <RolloverBtn
      type="primary"
      className="text-sm sm:text-base"
      keepOpen={alwaysOpen}
      on:click={() => openModal()}
      customBtnClass={responsive ? 'h-8 md:h-11 md:text-base text-sm' : ''}
    >
      <!-- TODO: Move string to translation config -->
      <span class="hidden md:inline-block"> Login </span>
      <span class=" md:hidden"> Login </span>
      <ConnectIcon slot="icon" className="h-4 w-4 mx-1" />
    </RolloverBtn>
  {/if}
{/if}
