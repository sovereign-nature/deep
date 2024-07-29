<script lang="ts">
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import { nextPage, hasMore } from '$lib/features/web3InboxNotifications';
  import RefreshIcon from '$lib/components/icons/RefreshIcon.svelte';
  import Spinner from '$lib/components/icons/Spinner.svelte';

  let isPending = false;

  async function getNextPage() {
    if (!nextPage) return;
    isPending = true;
    await nextPage().finally(() => {
      isPending = false;
    });
  }
</script>

{#if $hasMore}
  <button
    on:click={getNextPage}
    disabled={isPending}
    type="button"
    class="mt-3 mb-3 font-aeonki text-sm flex items-center gap-3 opacity-80 hover:opacity-100 text-gray-500 px-4 py-2 bg-gray-200 disabled:opacity-30 bg-opacity-5 rounded-full focus-within focus:border-primary-100 justify-self-center self-center"
  >
    {#if !isPending}
      {$LL.notifications.loadMore()}
      <RefreshIcon className="w-3 h-3" />
    {:else}
      {$LL.notifications.loadingFeed()}
      <Spinner className="w-3 h-3 text-gray-300  fill-gray-50 "></Spinner>
    {/if}</button
  >
{/if}
