<script lang="ts">
  import { MultiTabs } from '@sni/ui-kit';
  import { isFeatureEnabled } from '$lib/shared/utils';
  import { afterNavigate } from '$app/navigation';
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

  const { url, route } = $page;
  const showTestCollections = isFeatureEnabled('collectionsTest');

  let activeTabKey: CollectionKeys = tabConfig.activeKey;
  let activeTabIndex: number;

  $: setIndex(activeTabKey);

  function updateActive(key: CollectionKeys) {
    activeTabKey = key;
    updateQueryParams('q', key);
  }

  const qValue = url.searchParams.get('q');
  if (qValue) {
    activeTabKey = collections
      .map((collection) => collection.key)
      .includes(qValue as CollectionKeys)
      ? (qValue as CollectionKeys)
      : tabConfig.activeKey;
  }
  afterNavigate(() => {
    //reset the active tab to default on in page nav that has no params (eg. logo click)
    if (route?.id === $page?.route?.id) {
      const checkQ = $page.url.searchParams.get('q');
      if (checkQ === null) {
        activeTabKey = tabConfig.activeKey;
      }
    }
  });
  function setIndex(key: CollectionKeys) {
    activeTabIndex = collections.findIndex(
      (collection) => collection.key === key
    );
  }
  function onIndexChange(event: CustomEvent<number>) {
    if (event && event.detail !== undefined && collections[event.detail]) {
      activeTabKey = collections[event.detail].key;
      updateActive(activeTabKey);
    }
  }
</script>

<MultiTabs.Root
  setStartIndex={activeTabIndex}
  setActiveIndex={activeTabIndex}
  tabsTitle={$LL.collection()}
  tabsTitleFull={$LL.collectionMobile()}
  on:change={onIndexChange}
>
  <svelte:fragment slot="tabs-items">
    {#each collections as collection, index}
      {#if showTestCollections || !collection.test}
        <MultiTabs.Tab
          {index}
          tabItem={{
            label: $LL[collection.key].collectionName(),
            img: collection.avatar,
          }}
        >
          {#if collection.web3}
            <Web3Connection
              collectionAddress={collection.collectionAddress}
              web3Enabled={collection.web3.web3Enabled}
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
                web3Enabled={collection.web3.web3Enabled}
              >
                <svelte:fragment slot="highlights">
                  <slot />
                </svelte:fragment>
              </Web3Assets>
            </Web3Connection>
          {:else if collection.web2}
            <Web2SearchContainer
              directusCollectionId={collection.web2.directusCollectionId}
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
              <SearchResults {collection}>
                <svelte:fragment slot="highlights">
                  <slot />
                </svelte:fragment>
              </SearchResults>
            </Web2SearchContainer>
          {/if}
        </MultiTabs.Tab>
      {/if}
    {/each}
  </svelte:fragment>
</MultiTabs.Root>
