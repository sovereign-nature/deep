<script lang="ts">
  import type { NotifyClientTypes } from '@walletconnect/notify-client';
  import { formatDistanceToNowStrict } from 'date-fns';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import Info from '$lib/shared/typography/Info.svelte';
  import BellIcon from '$lib/components/icons/BellIcon.svelte';
  import MarkReadButton from '$lib/entities/InboxNotification/MarkReadButton.svelte';
  import { markAsRead } from '$lib/features/web3InboxNotifications';

  export let notification: NotifyClientTypes.NotifyNotification;
  export let types: NotifyClientTypes.ScopeMap[];
  export let isPending = false;

  $: type = findNotificationTypeByTopic(notification.type, types);
  const date = formatDate(notification.sentAt);
  const notificationClass =
    'bg-gray-100/90 hover:bg-gray-100 text-deep-green-950 dark:text-white dark:bg-deep-green-300/80 dark:hover:bg-deep-green-300 Notification-card  p-5 pt-4 rounded-lg';

  function findNotificationTypeByTopic(
    topic: string | undefined,
    notificationTypes: NotifyClientTypes.ScopeMap[]
  ) {
    if (!notificationTypes || topic === undefined) return;
    const type = notificationTypes.find((type) => String(type.id) === topic);
    return type ? type : undefined;
  }

  function formatDate(sentAt: number) {
    try {
      return formatDistanceToNowStrict(sentAt, {
        addSuffix: true,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function markRead() {
    isPending = true;
    await markAsRead(notification).finally(() => {
      isPending = false;
    });
  }
</script>

<div
  class={`${notification.isRead && 'opacity-85 hover:opacity-90 dark:opacity-60 hover:dark:opacity-70'} ${notificationClass}`}
>
  <div class="flex flex-row justify-between">
    <div class="flex flex-col sm:flex-row gap-x-3 gap-y-3 sm:gap-y-0 w-full">
      <div
        class="flex flex-row sm:flex-col flex-shrink-0 sm:justify-start me-2 justify-between"
      >
        <div
          class={`${notification.isRead && 'bg-orange-600'} h-6 w-6 sm:w-12 sm:h-12 founded-full bg-orange-400 text-white aspect-square flex justify-center items-center rounded-full`}
        >
          <BellIcon className="w-3 h-3 sm:w-6 sm:h-6" />
        </div>
        {#if !notification.isRead}
          <div class="flex flex-col justify-start items-end sm:hidden">
            <MarkReadButton {isPending} on:click={() => markRead()} />
          </div>
        {/if}
      </div>
      <div class="flex flex-col justify-center gap-2 text-sm text-left w-full">
        <div class="grid grid-cols-7 grid-flow-col">
          <div class="flex items-start col-span-7 sm:col-span-7">
            <h3 class="font-sans text-lg font-semibold">
              {notification.title}
            </h3>
            {#if !notification.isRead}
              <span
                class="ms-1 text-[9px] uppercase font-sans font-semibold text-primary-400 bg-deep-green-900 rounded-lg px-2 py-1"
              >
                {$LL.notifications.new()}
              </span>
            {/if}
          </div>
          {#if !notification.isRead}
            <div
              class="sm:flex flex-col justify-start items-end hidden grid-cols-1 start-5 col-span-1"
            >
              <MarkReadButton
                {isPending}
                on:click={() => markAsRead(notification)}
              />
            </div>
          {/if}
        </div>

        <p class="text-lg">
          {notification.body}
        </p>
      </div>
    </div>
  </div>
  <div class="flex flex-row justify-end items-center sm:ms-16 ps-1 mt-2">
    {#if type}
      <span class="font-light flex items-center text-sm me-2">
        <Info className="w-3 h-3 opacity-40">{type.description}</Info>
      </span>
    {/if}
    {#if notification.url}
      <a
        href={notification.url}
        target="_blank"
        class="text-sm text-primary-300 me-auto dark:text-primary-200 truncate w-1/2"
      >
        {notification.url}
      </a>
    {/if}
    <p class="text-italic text-xs text-start italic opacity-30">
      {date}
    </p>
  </div>
</div>
