import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';
import { writable, get } from 'svelte/store';
import { signMessage } from '@wagmi/core';

import type { NotifyClientTypes } from '@walletconnect/notify-client';
import type { GetNotificationsReturn } from '@web3inbox/core';
import { Web3InboxClient } from '@web3inbox/core';
import { getAccount } from '@wagmi/core';
import * as Sentry from '@sentry/sveltekit';
import { toast } from 'svelte-sonner';
import { PUBLIC_WEB3INBOX_ALL_APPS } from '$env/static/public';

import { projectId, wagmiConfig } from '$lib/shared/web3Configs';
type PageNotificationsFunctionType = ReturnType<
  Web3InboxClient['pageNotifications']
>;
type PageNotificationsReturnType = ReturnType<PageNotificationsFunctionType>;

const domain = 'real.sovereignnature.com';
const WEB3INBOX_ALL_APPS = PUBLIC_WEB3INBOX_ALL_APPS === 'true';
const allApps = WEB3INBOX_ALL_APPS || process.env.NODE_ENV === 'development';
const notificationsPerPage = 25;
const isInfiniteScroll = true;
//Store context variables
const web3InboxMessages = writable();
const web3InboxTypes = writable();
const web3InboxRegistered = writable<boolean>(false);
const web3InboxSubscribed = writable<boolean>(false);
const web3InboxSubscription = writable();
const web3InboxModalOpen = writable<boolean>(false);
const web3InboxMessageCount = writable<number>(0);
const web3InboxLoading = writable<boolean>(true); // Notify client loading state
const web3InboxEnabling = writable<boolean>(false); // state when registering, subscribing and setting up inbox are not resolved

let web3InboxClient: Web3InboxClient | null;
let web3ConnectedStore: Writable<boolean>;
let web3AddressStore: Writable<string>;

//TODO: this is a bit hacky, but can be changed if all inbox code subscription functions will have unsubscribe callbacks
let inboxInitialized = false;
let accountWatchInitialized = false;
let typeWatchInitialized = false;
let notificationWatchInitialized = false;
let notifications: PageNotificationsReturnType | undefined;

const getWeb3InboxAccount = () => {
  const address = getAccount(wagmiConfig).address?.toString();

  const account = address ? `eip155:1:${address}` : ''; //TODO: Are we sure to return empty string?
  return account;
};

// Web3Inbox Context Setup
export function setInboxContext() {
  setContext('web3InboxMessages', web3InboxMessages);
  setContext('web3InboxTypes', web3InboxTypes);
  setContext('web3InboxRegistered', web3InboxRegistered);
  setContext('web3InboxSubscribed', web3InboxSubscribed);
  setContext('web3InboxModalOpen', web3InboxModalOpen);
  setContext('web3InboxMessageCount', web3InboxMessageCount);
  setContext('web3InboxLoading', web3InboxLoading);
  setContext('web3InboxEnabling', web3InboxEnabling);

  web3ConnectedStore = getContext('web3Connected');
  web3AddressStore = getContext('web3Address');
}

export function initializeInbox() {
  if (inboxInitialized) return;
  inboxInitialized = true;

  web3ConnectedStore.subscribe((connected) => {
    if (connected) {
      console.log('Connected, proceeding to connect to inbox');

      connectToInbox();
    } else {
      clearInboxClient();
    }
  });
  web3AddressStore.subscribe(async () => {
    if (web3InboxClient) {
      const account = getWeb3InboxAccount();
      if (account) {
        console.log(
          `Inbox address changed to ${account}, reconfiguring inbox client`
        );
        resetInboxState();
        checkIfRegistered(account);
      } else {
        console.log(
          'Inbox account changed to no address, inbox client should be cleared' //TODO: Probably we need to call a cleanup function here
        );
      }
    } else {
      console.log('Address changed, no inbox client');
    }
  });
}

async function connectToInbox() {
  console.log('Connecting to inbox');
  const account = getWeb3InboxAccount();
  try {
    web3InboxClient = await Web3InboxClient.init({
      projectId,
      domain,
      allApps,
    });
    let lastProcessedAccount: string | null = null;

    await web3InboxClient.setAccount(account as string);

    if (!accountWatchInitialized && web3InboxClient) {
      accountWatchInitialized = true;

      web3InboxClient.watchAccount((newAccount) => {
        console.log('Account changed from watch', newAccount);
        if (newAccount && newAccount !== lastProcessedAccount) {
          console.log('inbox account changing to:', newAccount);
          web3InboxEnabling.set(true);
          resetInboxState();
          checkIfRegistered(account);
          lastProcessedAccount = newAccount;
        } else {
          console.log('Account is same or undefined');
        }
      });
    }
  } catch (e) {
    console.log('!! error setting inbox client');
  }
}

export async function registerInbox() {
  if (!web3InboxClient) return;

  const account = getWeb3InboxAccount();
  const { registerParams, message } = await web3InboxClient.prepareRegistration(
    {
      account: account,
    }
  );
  const signature = await signMessage(wagmiConfig, { message });

  await web3InboxClient
    .register({
      registerParams,
      signature,
    })
    .then(() => {
      console.log('Registered inbox');
    })
    .catch((error) => {
      console.error('Error registering inbox:', error);
      web3InboxEnabling.set(false);
      Sentry.captureException(error);
      toast.error('Sorry there was a problem registering the Web3Inbox');
    });
}
async function checkIfRegistered(account: string) {
  if (!web3InboxClient) return;

  const isRegistered = await web3InboxClient.getAccountIsRegistered(account);
  web3InboxRegistered.set(isRegistered);

  console.log('!!Account is registered:', isRegistered);

  if (!isRegistered) {
    web3InboxLoading.set(false); // If client hasn't registered, don't proceed to register state automatically
    web3InboxEnabling.set(false);
  } else {
    checkIfSubscribed(account);
  }
}
async function checkIfSubscribed(account: string) {
  if (!web3InboxClient) return;

  const isSubscribed = await web3InboxClient.isSubscribedToDapp(
    account,
    domain
  );

  web3InboxSubscribed.set(isSubscribed);

  console.log('!! Is subscriber: ', isSubscribed);
  if (isSubscribed) {
    getInboxContent();
  } else {
    await web3InboxClient
      .subscribeToDapp(account)
      .then(() => {
        console.log('!!Subscribed to dApp');
        web3InboxSubscribed.set(true);
        getInboxContent();
      })
      .catch((error) => {
        console.error('Error subscribing to dapp:', error);
      });
  }
}

async function clearInboxClient() {
  if (!web3InboxClient) return;

  web3InboxClient = null;
  web3InboxLoading.set(true);
  resetInboxState();
}

async function resetInboxState() {
  web3InboxRegistered.set(false);
  web3InboxSubscribed.set(false);
  web3InboxMessages.set(null);
  web3InboxMessageCount.set(0);
}

async function getInboxContent() {
  getNotificationTypes();
  getSubscription();
  await getNotifications();
  web3InboxEnabling.set(false);
  web3InboxLoading.set(false);
}

async function getSubscription() {
  if (!web3InboxClient) return;
  const account = getWeb3InboxAccount();
  const subscription = web3InboxClient.getSubscription(account, domain);
  const newMessages = subscription?.unreadNotificationCount
    ? subscription.unreadNotificationCount
    : 0;
  web3InboxMessageCount.set(newMessages);
  web3InboxSubscription.set(subscription);
  console.log('New Message Count:', newMessages);
  //Hack workaround for message count not being updated
  manualNewMessageCount();
}

function manualNewMessageCount() {
  if (Array.isArray(notifications?.data?.notifications)) {
    const unreadMessages: NotifyClientTypes.NotifyNotification[] =
      notifications.data.notifications.filter(
        (notification) => !notification.isRead
      );
    const unreadMessageCount = unreadMessages.length;
    const newMessageCount = get(web3InboxMessageCount) || 0;
    const updatedMessageCount = Math.min(unreadMessageCount, newMessageCount);
    if (updatedMessageCount < newMessageCount) {
      console.log(
        'Updated to use manual Notification Count',
        updatedMessageCount
      );
      web3InboxMessageCount.set(updatedMessageCount);
    }
  }
}

async function getNotifications() {
  if (!web3InboxClient) return;

  if (notificationWatchInitialized) {
    notifications?.stopWatchingNotifications();
    notifications = undefined;
    notificationWatchInitialized = false;
    console.log('Stopped Notification Watch');
  }
  console.log('Started Notification Watch');

  const account = getWeb3InboxAccount();
  notifications = await web3InboxClient.pageNotifications(
    notificationsPerPage,
    isInfiniteScroll,
    account,
    domain,
    true
  )(onUpdateNotifications);

  notificationWatchInitialized = true;
  console.log('Notifications:', notifications);
}

function onUpdateNotifications(e: GetNotificationsReturn) {
  console.log('Updating notifications');
  getSubscription();
  setupNotifications(e.notifications);
}

function setupNotifications(messages: NotifyClientTypes.NotifyNotification[]) {
  web3InboxMessages.set(messages);
  console.log('Updated Notifications:', messages);
}

export async function markNotificationsAsRead(notifications: string[]) {
  if (!web3InboxClient)
    return { success: false, error: 'Web3InboxClient is not initialized' };
  const account = getWeb3InboxAccount();
  try {
    await web3InboxClient.markNotificationsAsRead(
      notifications,
      account,
      domain
    );
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to mark notifications as read' };
  }
}

async function getNotificationTypes() {
  if (!web3InboxClient) return;

  const updateTypes = () => {
    const account = getWeb3InboxAccount();
    const types = web3InboxClient?.getNotificationTypes(account, domain);
    const transformTypes = Object.values(types); //TODO: Fix types
    console.log('Notification types:', transformTypes);
    web3InboxTypes.set(transformTypes);
  };

  if (!typeWatchInitialized) {
    typeWatchInitialized = true;
    web3InboxClient.watchSubscriptions(updateTypes);
  }
}

export async function updateScopes(scopes: string[]) {
  if (!web3InboxClient) return;
  const account = getWeb3InboxAccount();
  try {
    await web3InboxClient.update(scopes, account, domain);
  } catch (error) {
    console.error('Error updating scopes:', error);
  }
}
