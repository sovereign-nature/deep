<script lang="ts">
  // import { CloseButton } from 'flowbite-svelte';
  import type { NotifyClientTypes } from '@walletconnect/notify-client';
  import { formatDistanceToNowStrict } from 'date-fns';
  import Info from '$lib/shared/typography/Info.svelte';
  import BellIcon from '$lib/components/icons/BellIcon.svelte';
  export let notification: NotifyClientTypes.NotifyMessageRecord;

  let notificationTypes: NotifyClientTypes.ScopeMap[] = [];

  let type = findNotificationTypeByTopic(notification.message.type);

  let date = formatDate();

  function formatDate() {
    try {
      return formatDistanceToNowStrict(notification.publishedAt, {
        addSuffix: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  // function closeNotification(id: number) {
  //   deleteMessage(id);
  // }

  function findNotificationTypeByTopic(topic: string | undefined) {
    if (!notificationTypes || topic === undefined) return;
    const type = notificationTypes.find((type) => type.id.id === topic);

    return type ? type : undefined;
  }
</script>

<div
  class="Notification-card bg-gray-100/90 hover:bg-gray-100 text-deep-green-950 dark:text-white dark:bg-deep-green-300/80 dark:hover:bg-deep-green-300 p-5 pt-4 rounded-xl"
>
  <div class="flex flex-row justify-end items-end ms-16 ps-1 pb-3">
    {#if type}
      <span class="font-light flex gap-2 me-auto items-center text-sm">
        {type.name}
        <Info className="w-4 h-4 opacity-40">{type.description}</Info>
      </span>
    {/if}
    <div class="flex flex-col justify-start items-end opacity-40">
      <!-- <CloseButton
        class="bg-red"
        on:click={() => closeNotification(notification.id)}
      /> -->
    </div>
  </div>
  <div class="flex flex-row justify-between">
    <div class="flex flex-col sm:flex-row gap-x-3 gap-y-3 sm:gap-y-0">
      <div class="flex flex-col flex-shrink-0 justify-start me-2">
        {#if notification.message.icon}
          <img
            alt={notification.message.title}
            src={notification.message.icon}
            class="w-12 h-12 rounded-full object-cover aspect-square"
          />
        {:else}
          <div
            class="w-12 h-12 founded-full bg-orange-400 text-white aspect-square flex justify-center items-center rounded-full"
          >
            <BellIcon className="w-6 h-6" />
          </div>
        {/if}
      </div>
      <div class="flex flex-col justify-center gap-2 text-sm text-left">
        <h3 class="font-sans text-lg font-semibold">
          {notification.message.title}
        </h3>

        <p class="text-lg">
          {notification.message.body}
        </p>
      </div>
    </div>
  </div>
  <div class="flex flex-row justify-end items-end ms-16 ps-1 mt-2">
    {#if notification.message.url}
      <a
        href={notification.message.url}
        target="_blank"
        class="text-sm text-primary-300 me-auto dark:text-primary-200 truncate w-1/2"
      >
        {notification.message.url}
      </a>
    {/if}
    <p class="text-italic text-xs text-start italic opacity-30">
      {date}
    </p>
  </div>
</div>
