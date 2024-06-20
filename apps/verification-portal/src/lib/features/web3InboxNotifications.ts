import type { NotifyClientTypes } from '@walletconnect/notify-client';

import { markNotificationsAsRead } from '$lib/features/web3Inbox';

export let isPending = false;

export async function markAsRead(
  notification: NotifyClientTypes.NotifyNotification
) {
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
