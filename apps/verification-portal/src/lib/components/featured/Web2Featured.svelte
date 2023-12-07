<script lang="ts">
  import FeaturedContainer from '$lib/components/featured/index.svelte';
  import type { Writable } from 'svelte/store';
  import type { AssetFeatured } from '$lib/types';
  import { getContext } from 'svelte';

  const featured: Writable<AssetFeatured[]> = getContext('featured');
</script>

<FeaturedContainer featuredItems={$featured} />
