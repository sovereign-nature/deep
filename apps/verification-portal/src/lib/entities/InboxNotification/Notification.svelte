<script lang="ts">
  import type { NotifyClientTypes } from '@walletconnect/notify-client';
  import { formatDistanceToNowStrict } from 'date-fns';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import Info from '$lib/shared/typography/Info.svelte';
  import BellIcon from '$lib/components/icons/BellIcon.svelte';
  import MarkReadButton from '$lib/entities/InboxNotification/MarkReadButton.svelte';
  export let notification: NotifyClientTypes.NotifyNotification;
  import { markNotificationsAsRead } from '$lib/features/web3Inbox';

  let notificationTypes: NotifyClientTypes.ScopeMap[] = [];
  let isPending = false;

  let type = findNotificationTypeByTopic(notification.type);

  let date = formatDate();
  const notificationClass =
    'bg-gray-100/90 hover:bg-gray-100 text-deep-green-950 dark:text-white dark:bg-deep-green-300/80 dark:hover:bg-deep-green-300 Notification-card  p-5 pt-4 rounded-lg';

  function formatDate() {
    try {
      return formatDistanceToNowStrict(notification.sentAt, {
        addSuffix: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function findNotificationTypeByTopic(topic: string | undefined) {
    if (!notificationTypes || topic === undefined) return;
    const type = notificationTypes.find((type) => type.id.id === topic);

    return type ? type : undefined;
  }
  async function markAsRead() {
    isPending = true;
    await markNotificationsAsRead([notification.id])
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        isPending = false;
        notification.isRead = true;
      });
  }
</script>

<div
  class={`${notification.isRead && 'opacity-60 hover:opacity-70'} ${notificationClass}`}
>
  <div class="flex flex-row justify-end items-end ms-16 ps-1 pb-3">
    {#if type}
      <span class="font-light flex gap-2 me-auto items-center text-sm">
        {type.name}
        <Info className="w-4 h-4 opacity-40">{type.description}</Info>
      </span>
    {/if}
  </div>
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
            <MarkReadButton {isPending} on:click={markAsRead} />
          </div>
        {/if}
      </div>
      <div class="flex flex-col justify-center gap-2 text-sm text-left w-full">
        <div class="grid grid-cols-6 grid-flow-col">
          <div class="flex items-center col-span-6 sm:col-span-5">
            <h3 class="font-sans text-lg font-semibold">
              {notification.title}
            </h3>
            {#if !notification.isRead}
              <span
                class="ms-2 text-[9px] uppercase font-sans font-semibold text-primary-400 bg-deep-green-900 rounded-lg px-2 py-1"
              >
                {$LL.notifications.new()}
              </span>
            {/if}
          </div>
          {#if !notification.isRead}
            <div
              class="sm:flex flex-col justify-start items-end hidden grid-cols-1 start-5 col-span-1"
            >
              <MarkReadButton {isPending} on:click={markAsRead} />
            </div>
          {/if}
        </div>

        <p class="text-lg">
          {notification.body}
        </p>
      </div>
    </div>
  </div>
  <div class="flex flex-row justify-end items-end ms-16 ps-1 mt-2">
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
