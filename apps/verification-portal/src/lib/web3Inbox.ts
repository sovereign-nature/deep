import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';
import { get, writable } from 'svelte/store';

import { projectId } from '$lib/config/web3Configs';
import { onSign, type Web3Modal } from '$lib/web3Modal';
import type { NotifyClientTypes } from '@walletconnect/notify-client';
import { Web3InboxClient } from '@web3inbox/core';

const domain = 'real.sovereignnature.com';
const isLimited = process.env.NODE_ENV === 'production';

//Store context variables
const web3InboxMessages = writable();
const web3InboxTypes = writable();
const web3InboxRegistered = writable(false);
const web3InboxSubscribed = writable(false);
const web3InboxModalOpen = writable(false);
const web3InboxMessageCount = writable(0);
const web3InboxLoading = writable(true);

let web3InboxClient: Web3InboxClient | null;
let web3ConnectedStore: Writable<boolean>;
let web3AddressStore: Writable<string>;
let web3ModalStore: Writable<Web3Modal>;

const getWeb3InboxAccount = () => {
  const address = `eip155:1:${get(web3ModalStore).getAddress()}`;
  console.log('getWeb3InboxAccount', address);
  return address;
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
  web3ConnectedStore = getContext('web3Connected');
  web3AddressStore = getContext('web3Address');
  web3ModalStore = getContext('web3Modal');
}

export function initializeInbox() {
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
      console.log('Inbox address changed, reconfiguring inbox client');
      web3InboxClient.setAccount(getWeb3InboxAccount());
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
      isLimited: isLimited,
    });

    web3InboxClient.watchAccount((account) => {
      console.log('Account changed, registering', account);
      web3InboxClient!.register({ account, onSign, domain });
    });

    await web3InboxClient.setAccount(account);

    web3InboxClient.register({
      account,
      onSign,
      domain,
    });

    web3InboxLoading.set(false);

    const subscription = web3InboxClient.getSubscription(account, domain);

    const isSubscribed = web3InboxClient.isSubscribedToDapp(account, domain);

    const registered = await web3InboxClient.getAccountIsRegistered(account);

    console.log('User is registered:', registered);
    console.log('With account:', getWeb3InboxAccount());

    console.log('User is subscribed to dApp:', isSubscribed);
    console.log('Subscription account', subscription?.account);

    web3InboxSubscribed.set(isSubscribed);
    console.log('isSubscribed', isSubscribed);

    getInboxContent();
  } catch (error) {
    console.error('Error initializing inbox:', error);
  }
}

async function clearInboxClient() {
  if (!web3InboxClient) return;
  web3InboxClient = null;
  web3InboxRegistered.set(false);
  web3InboxSubscribed.set(false);
  web3InboxMessages.set(null);
  web3InboxTypes.set(null);
  web3InboxMessageCount.set(0);
  web3InboxLoading.set(true);
}

// function subscribeAndSetupInboxClient() {
//   console.log('Subscribing to dApp');
//   if (web3InboxClient) {
//     web3InboxClient.subscribeToDapp(getWeb3InboxAccount(), domain);
//   }
// }

async function getInboxContent() {
  getNotificationTypes();
  getMessages();
}

async function getMessages() {
  if (!web3InboxClient) return;
  const messages = web3InboxClient.getMessageHistory(
    getWeb3InboxAccount(),
    domain
  );
  setupMessages(messages);
  web3InboxClient.watchMessages(
    (m) => setupMessages(m),
    getWeb3InboxAccount(),
    domain
  );
}

function setupMessages(messages: NotifyClientTypes.NotifyMessageRecord[]) {
  web3InboxMessages.set(sortMessages(messages));
  web3InboxMessageCount.set(messages.length);
}

function sortMessages(messages: NotifyClientTypes.NotifyMessageRecord[]) {
  return messages.sort((a, b) => b.publishedAt - a.publishedAt);
}

async function getNotificationTypes() {
  if (!web3InboxClient) return;
  const types = await web3InboxClient.getNotificationTypes(
    getWeb3InboxAccount(),
    domain
  );
  const transformTypes = Object.values(types);
  web3InboxTypes.set(transformTypes);
}

export async function deleteMessage(id: number) {
  if (!web3InboxClient) return;

  try {
    web3InboxClient.deleteNotifyMessage({ id });
    getMessages();
  } catch (error) {
    console.error('Error deleting message:', error);
  }
}
