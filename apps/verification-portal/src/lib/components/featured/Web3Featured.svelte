<script lang="ts">
  import FeaturedContainer from '$lib/components/featured/index.svelte';
  import { shuffleArray } from '$lib/utils';
  import type { DeepAsset } from '@sni/types';

  export let highlights: DeepAsset[] = [];

  //TODO: Move processing to load function
  // Shuffle the items array and select the first 3 items
  let featured: DeepAsset[] = shuffleArray(highlights).slice(0, 3);
</script>

<FeaturedContainer featuredItems={featured} />
