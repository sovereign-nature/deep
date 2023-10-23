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
    'font-serif text-sm sm:text-base lg:text-xl xl:text-2xl text-gray-400 bg-black py-4 px-6 rounded transition mb-2 mt-0';
  let classInactive =
    'bg-black bg-opacity-20 hover:bg-opacity-40 hover:text-primary-300';
  let classActive = 'text-primary-200 bg-opacity-60 transition';

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

<Tabs
  style="pill"
  contentClass="bg-black p-6 md:p-12 bg-opacity-60 rounded-lg"
  divider={false}
>
  <TabItem
    title="Hotel Hideway"
    open={activeTab === 'hh'}
    class="sm:pb-3 mr-2 sm:mr-0"
    defaultClass={classDefault}
    inactiveClasses={classInactive}
    activeClasses={classActive}
    on:click={() => handleTabClick('hh')}
  >
    <Web2SearchContainer campaign="hotel_hideaway">
      <Web2SearchInput placeholder="Name, address or collection" />
      <SearchResults />
    </Web2SearchContainer>
  </TabItem>
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
  </TabItem>

  <!-- <TabItem
    title="Other Campaign Example"
    open={activeTab === 'mink'}
    class="sm:pb-3"
    defaultClass={classDefault}
    inactiveClasses={classInactive}
    activeClasses={classActive}
    on:click={() => handleTabClick('mink')}
  >
    <Web2SearchContainer campaign="aimm_minke_whales">
      <Web2SearchInput placeholder="Type the asset name" />
      <SearchResults />
    </Web2SearchContainer>
  </TabItem> -->
</Tabs>
