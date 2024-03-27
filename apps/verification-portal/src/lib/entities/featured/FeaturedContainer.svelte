<script lang="ts">
  import CardFeatured from '$lib/entities/featured/FeaturedCard.svelte';
  import LL from '$lib/shared/i18n/i18n-svelte';
  import type { DeepAsset } from '@sni/clients/assets-client/types';

  export let featuredItems: DeepAsset[];
  export let collectionName: string | undefined;
</script>

{#if featuredItems && featuredItems.length > 0}
  <div class="mt-8 sm:mt-12">
    <h5 class="text-gray-200 dark:text-gray-400 text-sm sm:text-xl font-sans sm:font-serif mb-5 text-center md:text-left">
      {#if collectionName}
      {$LL.highlightsFor({collectionName})}
      {:else}
      {$LL.highlights()}
      {/if}
    
    </h5>
    <div class="grid justify-center md:justify-start md:grid-cols-2 xl:grid-cols-3 gap-5">
      {#each featuredItems as item, index (item.address + index)}
        <CardFeatured {item} />
      {/each}
    </div>
  </div>
{/if}
