<script lang="ts">
  export let featuredItems: AssetFeatured[];
  import type { AssetFeatured } from '$lib/types';
  import CardFeatured from '$lib/components/cards/CardFeatured.svelte';
</script>

{#if featuredItems && featuredItems.length > 0}
  <div class="mt-12">
    <h2 class="text-gray-200 dark:text-gray-400 text-xl font-serif mb-5">
      Latest Highlights
    </h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each featuredItems as item (item.address)}
        <CardFeatured {item} />
      {/each}
    </div>
  </div>
{/if}
