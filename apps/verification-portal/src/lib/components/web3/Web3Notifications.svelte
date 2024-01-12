<script lang="ts">
  import RolloverBtn from '$lib/components/RolloverBtn.svelte';
  import BellIcon from '$lib/components/icons/BellIcon.svelte';
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

  let isLoaded = false;
  let hasMessages = false;

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
  onMount(async () => {
    isLoaded = true;
  });
</script>

{#if isFeatureEnabled('notificationsEnabled') && isLoaded && ($web3InboxRegistered || $web3Connected)}
  <RolloverBtn
    type="alert"
    hasNew={$web3InboxRegistered ? hasMessages : false}
    keepOpen={$web3InboxRegistered ? alertNew : !web3InboxLoading}
    on:click={$web3InboxSubscribed
      ? () => ($openInboxModal = true)
      : registerInbox}
  >
    {$web3InboxSubscribed
      ? $LL.notifications.nrNotification($web3MessageCount)
      : $LL.notifications.subscribe()}
    <span slot="icon">
      <BellIcon className="h-5 w-5 {$web3InboxRegistered ? '' : 'mx-1'}"
      ></BellIcon>
    </span>
  </RolloverBtn>
{/if}
