<script lang="ts">
  import { page } from '$app/stores';
  import Search from '$lib/components/Search.svelte';
  import LayoutLanding from '$lib/containers/LayoutLanding.svelte';
</script>

<LayoutLanding>
  <h1
    class="text-3xl text-white mb-8 md:text-left text-center sm:text-4xl lg:text-5xl"
  >
    <span class="text-primary-300 block md:inline"> {$page.status}</span>
    <span class="text-primary-300 hidden md:inline">| </span>
    {$page.error?.message}
  </h1>
  <h2
    class="text-base sm:text-2xl lg:text-3xl text-white md:text-left text-center mb-8"
  >
    Search for your asset to verify
  </h2>
  <Search />
</LayoutLanding>
