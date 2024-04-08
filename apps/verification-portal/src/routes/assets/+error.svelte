<script lang="ts">
  import { page } from '$app/stores';
  import CollectionsTabs from '$lib/widgets/CollectionTabs/CollectionTabs.svelte';
  import LL from '$lib/shared/i18n/i18n-svelte';
</script>

<div class=" px-4 md:px-0 pb-8 lg:mt-[3vh]">
  <div class="w-full lg:w-4/5 mx-auto">
    <h1
      class="text-3xl dark:text-gray-200 mb-8 md:text-left text-center sm:text-4xl lg:text-5xl"
    >
      <span class="text-primary-300 block md:inline"> {$page.status}</span>
      <span class="text-primary-300 hidden md:inline">| </span>
      {$page.error?.message}
    </h1>
    <h2
      class="text-base sm:text-2xl lg:text-3xl dark:text-gray-200 md:text-left text-center mb-8"
    >
      {$LL.errors.notFoundTitle()}
    </h2>
    <CollectionsTabs />
  </div>
</div>
