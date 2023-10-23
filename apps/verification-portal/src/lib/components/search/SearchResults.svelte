<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import Card from '$lib/components/Card.svelte';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';

  // Retrieve user store from context
  const results: Writable<[]> = getContext('results');
  const search: Writable<string> = getContext('search');
  const web2data: Writable<object> = getContext('web2data');
</script>

<div id="search-results" class="min-h-[300px]">
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
    <div class="flex justify-between mt-16 text-white">
      <span class="light">Showing results for <strong>"{$search}"</strong></span
      >
      <span class="italic">{$results.length} results</span>
    </div>
    <div class="mt-8">
      {#if $results.length > 0}
        <div class="flex flex-col gap-4">
          {#each $results as result (result.item.id)}
            <Card
              id={result.item.id}
              name={result.item.name}
              image={result.item.image}
              collection={result.item.collection}
              source="Hotel Hideaway"
              prefix="did:asset:deep:hotel-hideaway.asset:"
              isList
            />
          {/each}
        </div>
      {:else if $results.length == 0}
        <p class="text-xl text-center text-white">No results found.</p>
      {/if}
    </div>
  {:else if $search && $web2data.error}
    <div class="mt-24">
      <p class="text-xl text-center text-white">
        Uh-oh! It looks like a hiccup in the wild! 🐾 <br /> Please lend a paw by
        refreshing the page and trying again.
      </p>
    </div>
  {/if}
</div>
