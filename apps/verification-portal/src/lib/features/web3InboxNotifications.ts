import type { NotifyClientTypes } from '@walletconnect/notify-client';
import { formatDistanceToNowStrict } from 'date-fns';
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

export function findNotificationTypeByTopic(
  topic: string | undefined,
  notificationTypes: NotifyClientTypes.ScopeMap[]
) {
  if (!notificationTypes || topic === undefined) return;
  const type = notificationTypes.find((type) => String(type.id) === topic);
  return type ? type : undefined;
}

export function formatDate(sentAt: number) {
  try {
    return formatDistanceToNowStrict(sentAt, {
      addSuffix: true,
    });
  } catch (error) {
    console.error(error);
  }
}
