<script lang="ts">
  import FeaturedContainer from '$lib/containers/FeaturedContainer.svelte';
  import Web3Featured from '$lib/data/Web3Featured.json';
  import type { AssetFeatured } from '$lib/types';

  // Function to shuffle array randomly
  function shuffleArray(array: AssetFeatured[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Shuffle the items array and select the first 3 items
  let randomItems: AssetFeatured[] = shuffleArray(Web3Featured).slice(0, 3);
</script>

<FeaturedContainer featuredItems={randomItems} />
