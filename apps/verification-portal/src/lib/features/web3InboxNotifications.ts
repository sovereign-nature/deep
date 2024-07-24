import { writable, type Writable } from 'svelte/store';
import type { NotifyClientTypes } from '@walletconnect/notify-client';
import type { GetNotificationsReturn } from '@web3inbox/core';
import { web3InboxClient } from '$lib/features/web3Inbox';

//Notification config
const NOTIFICATIONS_PER_PAGE = 25;
const IS_INFINITE_SCROLL = true;
const UNREAD_FIRST = true;
//Notification store values
const notificationCount = writable(0);
const notifications: Writable<NotifyClientTypes.NotifyNotification[]> =
  writable([]);
const hasMore = writable(true);

let account: string | undefined;
let domain: string | undefined;
let nextPage: (() => Promise<void>) | undefined;
let notificationWatcher: () => void;
let notificationWatchInitialized = false;

export {
  notifications,
  notificationCount,
  hasMore,
  setupNotifications,
  markAsRead,
  markAllRead,
  nextPage,
  manualNewMessageCount,
  stopNotificationWatch,
};

async function setupNotifications(
  newAccount: string | undefined = undefined,
  newDomain: string | undefined = undefined
) {
  if (notificationWatchInitialized) {
    stopNotificationWatch();
  }

  account = newAccount;
  domain = newDomain;

  try {
    console.log(
      'Fetching notifications for account: ',
      account,
      ' on domain',
      domain
    );
    await fetchInitialNotifications();
    setupNotificationWatcher();
  } catch (error) {
    console.error('Failed to fetch notifications', error);
  }
}

async function fetchInitialNotifications() {
  if (!web3InboxClient) {
    console.error('Web3InboxClient is not initialized');
    return;
  }
  try {
    const notificationsPage = await web3InboxClient.getNotificationHistory(
      NOTIFICATIONS_PER_PAGE
    );

    notifications.set(notificationsPage.notifications);
    console.log(notificationsPage.notifications);
  } catch (error) {
    console.error('Failed to fetch initial notifications', error);
  }
}

async function setupNotificationWatcher() {
  if (!web3InboxClient) {
    console.error('Web3InboxClient is not initialized');
    return;
  }
  try {
    const { nextPage: getNextPage, stopWatchingNotifications: stopWatch } =
      web3InboxClient.pageNotifications(
        NOTIFICATIONS_PER_PAGE,
        IS_INFINITE_SCROLL,
        account,
        domain,
        UNREAD_FIRST
      )(onUpdate);

    nextPage = getNextPage;
    notificationWatchInitialized = true;
    notificationWatcher = stopWatch;
  } catch (error) {
    console.error('Failed to set up notification watcher', error);
  }
}

function onUpdate({
  notifications: newNotifications,
  hasMore: updateHasMore,
}: GetNotificationsReturn) {
  console.log('Updated Notifications');
  notifications.set(newNotifications);
  hasMore.set(updateHasMore);
}

async function markAsRead(notification: NotifyClientTypes.NotifyNotification) {
  try {
    await markSelectedNotificationsAsRead([notification.id]);
    notification.isRead = true;
    notificationCount.update((n) => n - 1);
  } catch (e) {
    console.error(e);
  }
}

async function markAllRead() {
  if (!web3InboxClient)
    return { success: false, error: 'Web3InboxClient is not initialized' };
  try {
    console.log('Marking all notifications as read');
    await web3InboxClient
      .markAllNotificationsAsRead(account, domain)
      .then(() => {
        //TODO: workaround to API watch not triggering, Update notifications in the store manually
        notifications.update((currentNotifications) => {
          return currentNotifications.map((notification) => ({
            ...notification,
            isRead: true,
          }));
        });
        // Reset notification count to 0
        notificationCount.set(0);
      });

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Failed to mark all notifications as read',
    };
  }
}

async function markSelectedNotificationsAsRead(notifications: string[]) {
  if (!web3InboxClient)
    return { success: false, error: 'Web3InboxClient is not initialized' };
  try {
    web3InboxClient.markNotificationsAsRead(notifications, account, domain);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to mark notifications as read' };
  }
}

//TODO this is a workaround for new notification count often not matching with message status
function manualNewMessageCount(apiCount: number) {
  notifications.subscribe(($notifications) => {
    const unreadMessages = $notifications.filter(
      (notification) => !notification.isRead
    );
    const unreadMessageCount = unreadMessages.length;

    // If apiCount matches NOTIFICATIONS_PER_PAGE, assume more notifications on the next page
    if (apiCount === NOTIFICATIONS_PER_PAGE) {
      notificationCount.set(unreadMessageCount);
    } else {
      const updatedMessageCount = Math.min(unreadMessageCount, apiCount);
      notificationCount.set(updatedMessageCount);
    }
  });
}

function stopNotificationWatch() {
  if (notificationWatchInitialized) {
    notificationWatcher();
    resetNotifications();
    notificationWatchInitialized = false;
    console.log('Stopped Notification Watch');
  }
}

function resetNotifications() {
  notifications.set([]);
  notificationCount.set(0);
  hasMore.set(true);
}
