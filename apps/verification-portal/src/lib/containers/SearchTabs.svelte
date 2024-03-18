<script lang="ts">
  import { TabItem, Tabs } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { updateQueryParams } from '$lib/shared/utils';
  import { page } from '$app/stores';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import { tabConfig, collections } from '$lib/shared/collectionsConfig';
  import type { CollectionKeys } from '$lib/shared/collectionsConfig';
  import SearchResults from '$lib/components/search/Web2SearchResults.svelte';
  import Web2SearchContainer from '$lib/containers/context/Web2Search.svelte';
  import Web2SearchInput from '$lib/components/search/Web2SearchInput.svelte';
  import Web3Connection from '$lib/containers/context/Web3Connection.svelte';
  import Web3SearchInput from '$lib/components/search/Web3SearchInput.svelte';
  import Web3Assets from '$lib/components/web3/Web3AssetsContainer.svelte';
  import type { DeepAsset } from '@sni/clients/assets-client/types';

  const url = $page.url;

  let activeTab: CollectionKeys = tabConfig.activeKey;
  export let highlights: DeepAsset[] = [];

  // tab classes
  let classDefault =
    'font-serif text-sm sm:text-base lg:text-xl xl:text-2xl text-gray-400 dark:text-gray-400 bg-deep-green dark:bg-black py-2 px-3 sm:py-4 sm:px-6 rounded transition mb-2 mt-0';
  let classInactive =
    'bg-deep-green dark:bg-black bg-opacity-5 dark:bg-opacity-20 hover:dark:text-primary-300 hover:bg-opacity-10 hover:text-primary-300';
  let classActive =
    'text-primary-300 dark:text-primary-200  dark:bg-opacity-60 transition';

  let tabClass = '';

  onMount(() => {
    const qValue = url.searchParams.get('q');
    if (qValue) {
      activeTab = collections
        .map((collection) => collection.key)
        .includes(qValue as CollectionKeys)
        ? (qValue as CollectionKeys)
        : tabConfig.activeKey;
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

  <!-- TODO: Refactor Web3Connection to store -->
  {#each collections as collection}
    {#if collection.web3}
      <Web3Connection
        collectionAddress={collection.collectionAddress}
        web3Enabled={collection.web3.web3Enabled}
      >
        <TabItem
          title={$LL[collection.key].collectionName()}
          open={activeTab === collection.key}
          class={tabClass}
          defaultClass={classDefault}
          inactiveClasses={classInactive}
          activeClasses={classActive}
          on:click={() => updateQueryParams('q', collection.key)}
        >
          <Web3SearchInput
            web3Enabled={collection.web3.web3Enabled}
            searchEnabled={collection.searchInput.searchEnabled}
            collectionAddress={collection.collectionAddress}
            goIcon
            inputmode={collection.searchInput.inputMode
              ? collection.searchInput.inputMode
              : 'text'}
            placeholder={collection.searchInput.customPlaceholder
              ? $LL[collection.key].searchPlaceholder() &&
                $LL[collection.key].searchPlaceholder().length > 0
                ? $LL[collection.key].searchPlaceholder()
                : $LL.web3.search.placeholder()
              : $LL.web3.search.placeholder()}
          />
          <Web3Assets
            collectionName={$LL[collection.key].collectionName()}
            {highlights}
            web3Enabled={collection.web3.web3Enabled}
          />
        </TabItem>
      </Web3Connection>
    {:else if collection.web2}
      <Web2SearchContainer
        directusCollectionId={collection.web2.directusCollectionId}
      >
        <TabItem
          title={$LL[collection.key].collectionName()}
          open={activeTab === collection.key}
          class={tabClass}
          defaultClass={classDefault}
          inactiveClasses={classInactive}
          activeClasses={classActive}
          on:click={() => updateQueryParams('q', collection.key)}
        >
          <Web2SearchInput
            searchEnabled={collection.searchInput.searchEnabled}
            placeholder={collection.searchInput.customPlaceholder
              ? $LL[collection.key].searchPlaceholder() &&
                $LL[collection.key].searchPlaceholder().length > 0
                ? $LL[collection.key].searchPlaceholder()
                : $LL.web2.search.placeholder()
              : $LL.web2.search.placeholder()}
            inputmode={collection.searchInput.inputMode
              ? collection.searchInput.inputMode
              : 'text'}
          />
          <SearchResults {highlights} />
        </TabItem>
      </Web2SearchContainer>
    {/if}
  {/each}
</Tabs>
