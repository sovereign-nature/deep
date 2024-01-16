<script lang="ts">
  import RolloverBtn from '$lib/components/RolloverBtn.svelte';
  import BellIcon from '$lib/components/icons/BellIcon.svelte';
  import Spinner from '$lib/components/icons/Spinner.svelte';
  import { LL } from '$lib/i18n/i18n-svelte';
  import { isFeatureEnabled } from '$lib/utils';
  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { registerInbox } from '$lib/web3Inbox';

  const web3Connected: Writable<boolean> = getContext('web3Connected');
  const web3InboxRegistered: Writable<boolean> = getContext(
    'web3InboxRegistered'
  );
  const web3InboxSubscribed: Writable<boolean> = getContext(
    'web3InboxSubscribed'
  );
  const openInboxModal: Writable<boolean> = getContext('web3InboxModalOpen');
  const web3MessageCount: Writable<number> = getContext(
    'web3InboxMessageCount'
  );
  const web3InboxLoading: Writable<boolean> = getContext('web3InboxLoading');
  const web3InboxEnabling: Writable<boolean> = getContext('web3InboxEnabling');
  export let alwaysOpen = false;
  export let placeholder = '';
  let isLoaded = false;
  let hasMessages = false;
  let keepOpen = false;
  let buttonLabel = '';

  let alertNew = false;
  let previousMessageCount = $web3MessageCount;

  $: {
    hasMessages = $web3MessageCount > 0;
    if ($web3MessageCount > previousMessageCount) {
      alertNew = true;
      setTimeout(() => {
        alertNew = false;
      }, 4000);
    }
    previousMessageCount = $web3MessageCount;
  }

  $: {
    keepOpen = alwaysOpen
      ? alwaysOpen
      : isLoaded &&
          !$web3InboxLoading &&
          $web3InboxRegistered &&
          $web3InboxSubscribed
        ? alertNew
        : false;
  }

  $: {
    buttonLabel =
      $web3InboxRegistered && $web3InboxSubscribed
        ? $LL.notifications.nrNotification($web3MessageCount)
        : placeholder
          ? placeholder
          : $LL.notifications.subscribe();
  }
  onMount(async () => {
    isLoaded = true;
  });
</script>

{#if isLoaded && (($web3InboxRegistered && $web3InboxSubscribed) || $web3Connected)}
  <RolloverBtn
    type="alert"
    disabled={$web3InboxLoading || $web3InboxEnabling}
    hasNew={$web3InboxRegistered && $web3InboxSubscribed ? hasMessages : false}
    {keepOpen}
    on:click={$web3InboxRegistered && $web3InboxSubscribed
      ? () => ($openInboxModal = true)
      : registerInbox}
  >
    {#if $web3InboxLoading}
      {$LL.notifications.connecting()}
    {:else if $web3InboxEnabling}
      {$LL.notifications.loading()}
    {:else}
      {buttonLabel}
    {/if}
    <span slot="icon">
      {#if $web3InboxLoading || $web3InboxEnabling}
        <Spinner
          className="w-5 h-5 text-orange-400  dark:text-orange-200 fill-orange-600 dark:fill-orange-400"
        ></Spinner>
      {:else}
        <BellIcon
          className="h-5 w-5  {$web3InboxRegistered && web3InboxSubscribed
            ? ''
            : 'mx-1'}"
        ></BellIcon>
      {/if}
    </span>
  </RolloverBtn>
{/if}
