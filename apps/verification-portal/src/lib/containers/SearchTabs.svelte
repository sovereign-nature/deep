<script lang="ts">
  import { updateQueryParams } from '$lib/utils';
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { LL } from '$lib/i18n/i18n-svelte';

  import SearchResults from '$lib/components/search/Web2SearchResults.svelte';
  import Web2SearchContainer from '$lib/containers/context/Web2Search.svelte';
  import Web2SearchInput from '$lib/components/search/Web2SearchInput.svelte';
  import Web3Connection from '$lib/containers/context/Web3Connection.svelte';
  import Web3SearchInput from '$lib/components/search/Web3SearchInput.svelte';
  import Web3Assets from '$lib/components/web3/Web3AssetsContainer.svelte';
  import type { DeepAsset } from '@sni/types';
  const url = $page.url;

  let activeTab = 'soundwaves';
  export let highlights: DeepAsset[] = [];

  // tab classes
  let classDefault =
    'font-serif text-sm sm:text-base lg:text-xl xl:text-2xl text-gray-400 dark:text-gray-400 bg-deep-green dark:bg-black py-2 px-3 sm:py-4 sm:px-6 rounded transition mb-2 mt-0';
  let classInactive =
    'bg-deep-green dark:bg-black bg-opacity-5 dark:bg-opacity-20 hover:dark:text-primary-300 hover:bg-opacity-10 hover:text-primary-300';
  let classActive =
    'text-primary-300 dark:text-primary-200  dark:bg-opacity-60 transition';

  let tabClass = '';

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
      activeTab = ['hh', 'sub0', 'soundwaves'].includes(qValue) ? qValue : 'hh';
    }
  });
</script>

<h2 class="text-gray-400 lg:hidden mb-0 text-sm sm:text-xl">
  {$LL.collection()}
</h2>
<Tabs
  style="pill"
  contentClass="bg-deep-green dark:bg-black p-6 md:p-12 bg-opacity-100 dark:bg-opacity-60 rounded-lg"
  defaultClass="flex flex-wrap gap-x-3 pb-2 "
  divider={false}
>
  <h2
    class="hidden lg:flex text-gray-400 me-2 py-4 mb-2 items-center"
    role="contentinfo"
  >
    {$LL.collection()}
  </h2>

  <!-- TODO: Unify Web3 tabs architecture -->
  <Web3Connection collectionId="real-test-1" {highlights}>
    <TabItem
      title="{$LL.soundwaves.collectionName()} "
      open={activeTab === 'soundwaves'}
      class={tabClass}
      defaultClass={classDefault}
      inactiveClasses={classInactive}
      activeClasses={classActive}
      on:click={() => handleTabClick('soundwaves')}
    >
      <Web3SearchInput
        web3enabled
        collection="soundwaves"
        goIcon
        inputmode="numeric"
        placeholder={$LL.soundwaves.placeholder()}
        searchEnabled={false}
      />
      <Web3Assets
        collectionName={$LL.soundwaves.collectionName()}
        web3enabled
      />
    </TabItem>
  </Web3Connection>
  <TabItem
    title="{$LL.sub0.collectionName()} "
    open={activeTab === 'sub0'}
    class={tabClass}
    defaultClass={classDefault}
    inactiveClasses={classInactive}
    activeClasses={classActive}
    on:click={() => handleTabClick('sub0')}
  >
    <Web3SearchInput
      collection="sub0"
      goIcon
      inputmode="numeric"
      placeholder={$LL.sub0.placeholder()}
    />
    <Web3Assets collectionName={$LL.sub0.collectionName()} {highlights} />
  </TabItem>
  <Web2SearchContainer campaign="hotel_hideaway">
    <TabItem
      title="Hotel Hideaway"
      open={activeTab === 'hh'}
      class={tabClass}
      defaultClass={classDefault}
      inactiveClasses={classInactive}
      activeClasses={classActive}
      on:click={() => handleTabClick('hh')}
    >
      <Web2SearchInput placeholder={$LL.web2.search.placeholder()} />
      <SearchResults />
    </TabItem>
  </Web2SearchContainer>
</Tabs>
