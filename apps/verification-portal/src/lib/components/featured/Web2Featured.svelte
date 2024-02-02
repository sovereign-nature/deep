<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';
  import FeaturedContainer from '$lib/components/featured/index.svelte';
  import type { AssetFeatured } from '$lib/types';

  const featured: Writable<AssetFeatured[]> = getContext('featured');
</script>

<FeaturedContainer featuredItems={$featured} />
