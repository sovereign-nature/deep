<script lang="ts">
  import { page } from '$app/stores';
  import CollectionsTabs from '$lib/widgets/CollectionTabs/CollectionTabs.svelte';
  import LayoutLanding from '$lib/containers/LayoutLanding.svelte';
  import LL from '$lib/shared/i18n/i18n-svelte';
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
    {$LL.errors.notFoundTitle()}
  </h2>
  <CollectionsTabs />
</LayoutLanding>
