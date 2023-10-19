<script lang="ts">
  import { Tabs, TabItem } from 'flowbite-svelte';
  import Search from '../components/Search.svelte';
  import SearchContainer from './SearchContainer.svelte';
  import { onMount } from 'svelte';

  let activeTab = 'hh';

  function handleTabClick(tab: string) {
    activeTab = tab;
    updateQueryParam('q', tab);
  }

  function updateQueryParam(param: string, value: string) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(param, value);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('q')) {
      const qValue = urlParams.get('q');
      activeTab = qValue === 'sub0' ? 'sub0' : 'hh';
    }
  });
</script>

<Tabs style="pill" contentClass="bg-transparent" divider={false}>
  <TabItem
    title="Hotel Hideway"
    open={activeTab === 'hh'}
    defaultClass="font-aeonik text-gray-400 py-2 px-4 rounded-xl w-40 transition"
    inactiveClasses="bg-gray-50 bg-opacity-10 hover:bg-opacity-60 hover:text-black"
    activeClasses="bg-gray-50 "
    on:click={() => handleTabClick('hh')}
  >
    <SearchContainer></SearchContainer>
  </TabItem>
  <TabItem
    title="sub0"
    open={activeTab === 'sub0'}
    class="pb-3"
    defaultClass="font-aeonik text-gray-400 py-2 px-4 rounded-xl w-40 transition"
    inactiveClasses="bg-gray-50 bg-opacity-10 hover:bg-opacity-60 hover:text-black"
    activeClasses="bg-gray-50 "
    on:click={() => handleTabClick('sub0')}
  >
    <Search network="sub0" goIcon inputmode="numeric" />
  </TabItem>
</Tabs>
