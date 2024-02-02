<script lang="ts">
  import type { DeepAsset } from '@sni/types';
  import FeaturedContainer from '$lib/components/featured/index.svelte';
  import { shuffleArray } from '$lib/shared/utils';

  export let highlights: DeepAsset[];
</script>

<!-- Move shuffling to load function -->
<FeaturedContainer featuredItems={shuffleArray(highlights).slice(0, 3)} />
