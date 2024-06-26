<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { flip } from 'svelte/animate';
  import type { DeepAsset } from '@sni/types';
  import Card from '$lib/components/Card.svelte';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
  import Spinner from '$lib/components/icons/Spinner.svelte';
  import type { Web3DataState } from '$lib/types';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import Web3Notifications from '$lib/widgets/ButtonInboxConnect/Web3Notifications.svelte';
  import RefreshIcon from '../icons/RefreshIcon.svelte';

  export let web3Enabled = false;
  export let collectionName: string;

  const web3Items: Writable<DeepAsset[]> = getContext('web3Items');
  const web3Connected: Writable<boolean> = getContext('web3Connected');
  const web3Response: Writable<Web3DataState> = getContext('web3Response');
  const getWeb3Assets: () => void = getContext('web3Assets');
  function refetchItems() {
    getWeb3Assets();
  }
</script>

{#key $web3Connected}
  {#if web3Enabled && $web3Connected}
    <div id="search-results" class=" flex flex-col sm:min-h-[460px]">
      {#if $web3Connected && !$web3Response.loaded}
        <div class="flex flex-row justify-between mt-16 text-white">
          <ImagePlaceholder className="h-4 !w-36" />
          <ImagePlaceholder className="h-4 !w-24" />
        </div>
        <div class="flex flex-col gap-2 mt-8 text-white w-full">
          <ImagePlaceholder className="h-20" />
          <ImagePlaceholder className="h-20" />
          <ImagePlaceholder className="h-20" />
        </div>
      {:else if $web3Connected && $web3Response.loaded && !$web3Response.error}
        <div
          class="flex flex-col gap-y-3 sm:flex-row flex-wrap sm:flew-nowrap sm:items-baseline justify-between mt-16 text-white text-xs sm:text-sm"
        >
          <h2
            class="text-gray-200 dark:text-gray-400 text-sm sm:text-xl font-sans sm:font-serif mb-5 text-center md:text-left"
          >
            {$LL.wallet.myAssets({
              collection: collectionName,
              nrOfAssets: $web3Items.length,
            })}
          </h2>
          <div class="flex justify-center md:justify-end">
            <Web3Notifications
              alwaysOpen
              placeholder={$LL.notifications.subscribeCollection()}
            ></Web3Notifications>
          </div>
        </div>
        <div class="mt-5 sm:mt-8">
          {#if $web3Items.length > 0}
            <div class="flex flex-col gap-4">
              {#each $web3Items as result (result.id)}
                <div animate:flip={{ duration: 250 }}>
                  <Card
                    name={result.name}
                    image={result.image}
                    collection={result.collection.name}
                    source="Web3"
                    address={result.address}
                  />
                </div>
              {/each}
            </div>
          {:else if $web3Items.length == 0}
            <p class="text-base md:text-xl text-center text-gray-200">
              {$LL.wallet.noAssets()}
            </p>
          {/if}
        </div>
      {:else if $web3Connected && $web3Response.error}
        <div class="mt-24">
          <p
            class="text-base md:text-xl text-center text-gray-200 whitespace-pre-line"
          >
            {$LL.wallet.errorMessage()}
          </p>
        </div>
      {/if}

      <button
        on:click={refetchItems}
        disabled={!$web3Response.loaded}
        class="mt-8 font-aeonki text-sm flex items-center gap-3 opacity-80 hover:opacity-100 text-gray-500 px-4 py-2 bg-gray-200 disabled:opacity-30 bg-opacity-5 rounded-full focus-within focus:border-primary-100 justify-self-center self-center"
      >
        {#if $web3Response.loaded}
          {$LL.results.refreshFeed()}
          <RefreshIcon className="w-3 h-3" />
        {:else}
          {$LL.results.refreshing()}
          <Spinner className="w-3 h-3 text-gray-300  fill-gray-50 "></Spinner>
        {/if}</button
      >
    </div>
  {:else}
    <slot name="highlights" />
  {/if}
{/key}
