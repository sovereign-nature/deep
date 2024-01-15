<script lang="ts">
  import FeaturedContainer from '$lib/components/featured/index.svelte';
  import Web3Featured from '$lib/data/Web3Featured.json'; //TODO: Replace with API call to highlights services
  import type { AssetFeatured } from '$lib/types';
  import { shuffleArray } from '$lib/utils';

  // Shuffle the items array and select the first 3 items
  let featured: AssetFeatured[] = shuffleArray(Web3Featured).slice(0, 3);
</script>

<FeaturedContainer featuredItems={featured} />
