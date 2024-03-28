<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { flip } from 'svelte/animate';
  import Card from '$lib/components/Card.svelte';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
  import type { Web2DataState } from '$lib/types';
  import type { Collection } from '$lib/shared/collectionsConfig';

  import FeaturedContainer from '$lib/entities/featured/FeaturedContainer.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import type { FuseResult } from 'fuse.js';
  import type { DeepAsset } from '@sni/types';

  export let highlights: DeepAsset[] = [];
  export let collection: Collection;

  // Retrieve user store from context
  const results: Writable<Array<FuseResult<DeepAsset>>> = getContext('results');
  const search: Writable<string> = getContext('search');
  const web2data: Writable<Web2DataState> = getContext('web2data');
  const prefix = collection.collectionAddress;
</script>

{#if $search}
  <div id="search-results" class="min-h-[420px]">
    {#if !$web2data.loaded}
      <div class="flex flex-row justify-between mt-16 text-white">
        <ImagePlaceholder className="h-4 !w-36" />
        <ImagePlaceholder className="h-4 !w-24" />
      </div>
      <div class="flex flex-col gap-2 mt-8 text-white w-full">
        <ImagePlaceholder className="h-20" />
        <ImagePlaceholder className="h-20" />
        <ImagePlaceholder className="h-20" />
      </div>
    {:else if $web2data.loaded && !$web2data.error}
      <div
        class="flex flex-row flex-wrap sm:flew-nowrap justify-between mt-16 text-white text-xs sm:text-sm"
      >
        <span class="light"
          >{$LL.results.resultsFor()} <strong>"{$search}"</strong></span
        >
        <span class="italic">{$LL.results.nrResults($results.length)}</span>
      </div>
      <div class="mt-5 sm:mt-8">
        {#if $results.length > 0}
          <div class="flex flex-col gap-4">
            {#each $results as result (result.item.id)}
              <!-- TODO: What is practical meaning of item collection? -->
              <div animate:flip={{ duration: 250 }}>
                <Card
                  name={result.item.name}
                  image={result.item.image}
                  collection="fpf-upemba"
                  source="Hotel Hideaway"
                  address={`${prefix}${result.item.id}`}
                />
              </div>
            {/each}
          </div>
        {:else if $results.length == 0}
          <p class="text-xl text-center text-white">
            {$LL.results.noResults()}
          </p>
        {/if}
      </div>
    {:else if $web2data.error}
      <div class="mt-24">
        <p class="text-xl text-center text-white whitespace-pre-line">
          {$LL.results.errorMessage()}
        </p>
      </div>
    {/if}
  </div>
{:else if highlights.length > 0}
  <FeaturedContainer
    collectionName={$LL[collection.key].collectionName()}
    featuredItems={highlights}
  />
{/if}
