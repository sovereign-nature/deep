<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { flip } from 'svelte/animate';
  import Card from '$lib/components/Card.svelte';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
  import type { AssetFeatured, Web2DataState } from '$lib/types';
  import FeaturedContainer from '$lib/components/featured/Web2Featured.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';

  // Retrieve user store from context
  const results: Writable<[]> = getContext('results');
  const search: Writable<string> = getContext('search');
  const web2data: Writable<Web2DataState> = getContext('web2data');
  const featured: Writable<AssetFeatured[]> = getContext('featured');
  const prefix = 'did:asset:deep:hotel-hideaway.asset:';
</script>

{#if !$search && $web2data.loaded && $featured.length > 0}
  <FeaturedContainer />
{/if}

<div id="search-results" class="">
  {#if $search && !$web2data.loaded}
    <div class="flex flex-row justify-between mt-16 text-white">
      <ImagePlaceholder className="h-4 !w-36" />
      <ImagePlaceholder className="h-4 !w-24" />
    </div>
    <div class="flex flex-col gap-2 mt-8 text-white w-full">
      <ImagePlaceholder className="h-20" />
      <ImagePlaceholder className="h-20" />
      <ImagePlaceholder className="h-20" />
    </div>
  {:else if $search && $web2data.loaded && !$web2data.error}
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
            <div animate:flip={{ duration: 250 }}>
              <Card
                id={result.item.id}
                name={result.item.name}
                image={result.item.image}
                collection={result.item.collection}
                source="Hotel Hideaway"
                {prefix}
                isList
              />
            </div>
          {/each}
        </div>
      {:else if $results.length == 0}
        <p class="text-xl text-center text-white">{$LL.results.noResults()}</p>
      {/if}
    </div>
  {:else if $search && $web2data.error}
    <div class="mt-24">
      <p class="text-xl text-center text-white whitespace-pre-line">
        {$LL.results.errorMessage()}
      </p>
    </div>
  {/if}
</div>
