<script>
  import Search from '$lib/components/Search.svelte';
  import LayoutLanding from '$lib/containers/LayoutLanding.svelte';
  import ShareCard from '$lib/components/ShareCard.svelte';
  import SearchTabs from '$lib/containers/SearchTabs.svelte';
</script>

<ShareCard />

<LayoutLanding>
  <h1
    class=" text-white mb-4 md:text-left text-center text-3xl sm:text-4xl lg:text-5xl"
  >
    Search for your asset to verify
  </h1>

  <SearchTabs />
</LayoutLanding>
