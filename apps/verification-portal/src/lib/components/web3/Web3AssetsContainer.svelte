<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import Card from '$lib/components/Card.svelte';
  import { flip } from 'svelte/animate';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
  import type { AssetFeatured, Web3DataState } from '$lib/types';
  import FeaturedContainer from '$lib/components/featured/Web3Featured.svelte';
  import { LL } from '$lib/i18n/i18n-svelte';
  import Web3Subscribe from '$lib/components/web3/Web3Subscribe.svelte';

  export let web3enabled = false;
  export let collectionName: string;
  const web3Items: Writable<AssetFeatured[]> = getContext('web3Items');
  const web3Connected: Writable<boolean> = getContext('web3Connected');
  const web3Response: Writable<Web3DataState> = getContext('web3Response');
</script>

{#key $web3Connected}
  {#if web3enabled && $web3Connected}
    <div id="search-results" class="">
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
          class="flex flex-row flex-wrap sm:flew-nowrap items-end justify-between mt-16 text-white text-xs sm:text-sm"
        >
          <h2 class="text-2xl">
            {$LL.wallet.myAssets({
              collection: collectionName,
              nrOfAssets: $web3Items.length,
            })}
          </h2>
          <div class="flex">
            <Web3Subscribe placeholder={$LL.notifications.subscribeCollection()}
            ></Web3Subscribe>
          </div>
        </div>
        <!-- <div
          class="flex flex-row flex-wrap sm:flew-nowrap justify-between mt-5 text-white text-xs sm:text-sm"
        >
          <span class="light"
            >{$LL.wallet.assetsFor()}
            <strong
              >{$LL.wallet.assetsFor_pt2({
                collection: collectionName,
              })}</strong
            ></span
          >
          <div class="flex">
            <span class="italic">{$LL.wallet.nrAssets($web3Items.length)}</span>
          </div>
        </div> -->
        <div class="mt-5 sm:mt-8">
          {#if $web3Items.length > 0}
            <div class="flex flex-col gap-4">
              {#each $web3Items as result (result.id)}
                <div animate:flip={{ duration: 250 }}>
                  <Card
                    id={result.id}
                    name={result.name}
                    nftImage
                    image={result.image}
                    collection={result.collection.name}
                    source="Web3"
                    address={result.address}
                    isList
                  />
                </div>
              {/each}
            </div>
          {:else if $web3Items.length == 0}
            <p class="text-xl text-center text-white">
              {$LL.wallet.noAssets()}
            </p>
          {/if}
        </div>
      {:else if $web3Connected && $web3Response.error}
        <div class="mt-24">
          <p class="text-xl text-center text-white whitespace-pre-line">
            {$LL.wallet.errorMessage()}
          </p>
        </div>
      {/if}
    </div>
  {:else}
    <FeaturedContainer />
  {/if}
{/key}
