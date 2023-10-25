<script lang="ts">
  import { updateQueryParams } from '$lib/utils';
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Web2SearchContainer from '$lib/containers/Web2SearchContainer.svelte';
  import Web2SearchInput from '$lib/components/search/Web2SearchInput.svelte';
  import Web3SearchInput from '$lib/components/search/Web3SearchInput.svelte';
  import SearchResults from '$lib/components/search/SearchResults.svelte';
  import Web3Featured from '$lib/containers/Web3Featured.svelte';

  const url = $page.url;

  let activeTab = 'hh';

  // tab classes
  let classDefault =
    'font-serif text-sm sm:text-base lg:text-xl xl:text-2xl text-gray-400 dark:text-gray-400 bg-deep-green dark:bg-black py-4 px-6 rounded transition mb-2 mt-0';
  let classInactive =
    'bg-deep-green dark:bg-black bg-opacity-5 dark:bg-opacity-20 hover:dark:text-primary-300 hover:bg-opacity-10 hover:text-primary-300';
  let classActive =
    'text-primary-300 dark:text-primary-200  dark:bg-opacity-60 transition';

  function handleTabClick(tab: string) {
    activeTab = tab;
    if (activeTab === 'hh') {
      updateQueryParams('q', tab, true);
    } else {
      updateQueryParams('q', tab);
    }
  }

  onMount(() => {
    const qValue = url.searchParams.get('q');
    if (qValue) {
      activeTab = qValue === 'sub0' ? 'sub0' : 'hh';
    }
  });
</script>

<h2 class="text-gray-400 mb-2">Collection:</h2>
<Tabs
  style="pill"
  contentClass="bg-deep-green dark:bg-black p-6 md:p-12 bg-opacity-100 dark:bg-opacity-60 rounded-lg"
  divider={false}
>
  <Web2SearchContainer campaign="hotel_hideaway">
    <TabItem
      title="Hotel Hideaway"
      open={activeTab === 'hh'}
      class="sm:pb-3 mr-2 sm:mr-0"
      defaultClass={classDefault}
      inactiveClasses={classInactive}
      activeClasses={classActive}
      on:click={() => handleTabClick('hh')}
    >
      <Web2SearchInput placeholder="Asset name" />
      <SearchResults />
    </TabItem>
  </Web2SearchContainer>
  <TabItem
    title="sub0 Biodiversity"
    open={activeTab === 'sub0'}
    class="!ml-0 sm:!ml-3 sm:pb-3"
    defaultClass={classDefault}
    inactiveClasses={classInactive}
    activeClasses={classActive}
    on:click={() => handleTabClick('sub0')}
  >
    <Web3SearchInput network="sub0" goIcon inputmode="numeric" />
    <Web3Featured />
  </TabItem>
</Tabs>
