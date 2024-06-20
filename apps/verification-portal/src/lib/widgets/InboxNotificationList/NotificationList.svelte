<script lang="ts">
  import { flip } from 'svelte/animate';
  import type { NotifyClientTypes } from '@walletconnect/notify-client';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import NotificationMessage from '$lib/entities/InboxNotification/Notification.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  let notificationTypes: Writable<NotifyClientTypes.ScopeMap[]> =
    getContext('web3InboxTypes');

  const web3Messages: Writable<NotifyClientTypes.NotifyNotification[]> =
    getContext('web3InboxMessages');

  let notifications: NotifyClientTypes.NotifyNotification[] = [];
  let types: NotifyClientTypes.ScopeMap[] = [];
  $: types = $notificationTypes;
  $: notifications = $web3Messages;
</script>

<div class="flex flex-col gap-5 pb-16 pe-3 sm:pe-2">
  {#if notifications && notifications.length > 0}
    {#each notifications as notification (notification.id)}
      <div animate:flip={{ duration: 300 }}>
        <NotificationMessage {types} {notification}></NotificationMessage>
      </div>
    {/each}
  {:else}
    <span>{$LL.notifications.notFound()}</span>
  {/if}
</div>
