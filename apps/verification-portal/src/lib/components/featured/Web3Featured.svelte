<script lang="ts">
  import type { DeepAsset } from '@sni/clients/assets-client/types';
  import FeaturedContainer from '$lib/components/featured/index.svelte';

  export let highlights: DeepAsset[];
</script>

<!-- Move shuffling to load function -->
<FeaturedContainer featuredItems={highlights.slice(0, 3)} />
