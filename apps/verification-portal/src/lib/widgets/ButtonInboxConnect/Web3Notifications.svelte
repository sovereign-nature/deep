<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  import RolloverBtn from '$lib/shared/components/RolloverBtn.svelte';
  import BellIcon from '$lib/components/icons/BellIcon.svelte';
  import Spinner from '$lib/components/icons/Spinner.svelte';
  import PowerOn from '$lib/components/icons/PowerOnIcon.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import { registerInbox } from '$lib/features/web3Inbox';
  import { notificationCount } from '$lib/features/web3InboxNotifications';
  export let responsive = false;

  const web3Connected: Writable<boolean> = getContext('web3Connected');
  const web3InboxRegistered: Writable<boolean> = getContext(
    'web3InboxRegistered'
  );
  const web3InboxSubscribed: Writable<boolean> = getContext(
    'web3InboxSubscribed'
  );
  const openInboxModal: Writable<boolean> = getContext('web3InboxModalOpen');

  const web3InboxLoading: Writable<boolean> = getContext('web3InboxLoading');
  const web3InboxEnabling: Writable<boolean> = getContext('web3InboxEnabling');
  export let alwaysOpen = false;
  export let placeholder = '';
  let isLoaded = false;
  let hasMessages = false;
  let keepOpen = false;
  let buttonLabel = '';
  let buttonLabelSm: string | number = '';

  let alertNew = false;
  let previousMessageCount = $notificationCount;

  $: {
    hasMessages = $notificationCount > 0;
    if ($notificationCount > previousMessageCount) {
      alertNew = true;
      setTimeout(() => {
        alertNew = false;
      }, 4000);
    }
    previousMessageCount = $notificationCount;
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
        ? $LL.notifications.nrNotification($notificationCount)
        : placeholder
          ? placeholder
          : $LL.notifications.subscribe();
  }
  $: {
    buttonLabelSm =
      $web3InboxRegistered && $web3InboxSubscribed
        ? $notificationCount
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
    className="text-xs"
    customBtnClass={responsive ? 'h-8 md:h-11 md:text-base text-sm' : ''}
    disabled={$web3InboxLoading || $web3InboxEnabling}
    hasNew={$web3InboxRegistered && $web3InboxSubscribed ? hasMessages : false}
    {keepOpen}
    on:click={$web3InboxRegistered && $web3InboxSubscribed
      ? () => ($openInboxModal = true)
      : registerInbox}
  >
    {#if $web3InboxLoading}
      <span class="hidden md:inline-block"> {buttonLabel}</span>
    {:else if $web3InboxEnabling}
      <span class="hidden md:inline-block"> {$LL.notifications.loading()}</span>
    {:else if responsive}
      <span class="hidden md:inline-block"> {buttonLabel}</span>
      <span class="md:hidden text-xs flex">
        {#if !$web3InboxRegistered || !$web3InboxSubscribed}
          <PowerOn className="h-3.5 w-3.5 -mx-1"></PowerOn>
        {:else}
          {buttonLabelSm}
        {/if}
      </span>
    {:else}
      {buttonLabel}
    {/if}
    <span slot="icon">
      {#if $web3InboxLoading || $web3InboxEnabling}
        <Spinner
          className="h-4 w-4 md:h-5 md:w-5 text-orange-400  dark:text-orange-200 fill-orange-600 dark:fill-orange-400"
        ></Spinner>
      {:else}
        <BellIcon
          className="h-4 w-4 md:h-5 md:w-5  {$web3InboxRegistered &&
          $web3InboxSubscribed
            ? ''
            : 'mx-1'}"
        ></BellIcon>
      {/if}
    </span>
  </RolloverBtn>
{/if}
