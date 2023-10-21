<script lang="ts">
  import { updateQueryParams } from '$lib/utils';
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Web2SearchContainer from '$lib/containers/Web2SearchContainer.svelte';
  import Web2SearchInput from '$lib/components/search/Web2SearchInput.svelte';
  import Web3SearchInput from '$lib/components/search/Web3SearchInput.svelte';
  import SearchResults from '$lib/components/search/SearchResults.svelte';

  const url = $page.url;

  let activeTab = 'hh';

  // tab classes
  let classDefault =
    'font-aeonik text-gray-400 py-2 px-4 rounded-xl w-40 transition';
  let classInactive =
    'bg-gray-50 bg-opacity-10 hover:bg-opacity-60 hover:text-black';
  let classActive = 'bg-gray-50 ';

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

<Tabs style="pill" contentClass="bg-transparent" divider={false}>
  <TabItem
    title="Hotel Hideway"
    open={activeTab === 'hh'}
    class="pb-3"
    defaultClass={classDefault}
    inactiveClasses={classInactive}
    activeClasses={classActive}
    on:click={() => handleTabClick('hh')}
  >
    <Web2SearchContainer campaign="hotel_hideaway">
      <Web2SearchInput placeholder="Type the asset name" />
      <SearchResults />
    </Web2SearchContainer>
  </TabItem>
  <TabItem
    title="sub0"
    open={activeTab === 'sub0'}
    defaultClass={classDefault}
    inactiveClasses={classInactive}
    activeClasses={classActive}
    on:click={() => handleTabClick('sub0')}
  >
    <Web3SearchInput network="sub0" goIcon inputmode="numeric" />
  </TabItem>
</Tabs>
