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
const web3InboxLoading = writable(true); // Notify client loading state
const web3InboxEnabling = writable(false); // state when registering, subscribing and setting up inbox are not resolved

let web3InboxClient: Web3InboxClient | null;
let web3ConnectedStore: Writable<boolean>;
let web3AddressStore: Writable<string>;
let web3ModalStore: Writable<Web3Modal>;

const getWeb3InboxAccount = () => {
  const address = get(web3ModalStore).getAddress();
  const account = address ? `eip155:1:${address}` : undefined; //TODO: Proper handling of undefined account needed in downstream functions
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
      const account = getWeb3InboxAccount();
      if (account) {
        console.log(
          `Inbox address changed to ${account}, reconfiguring inbox client`
        );
        const registered =
          await web3InboxClient.getAccountIsRegistered(account);
        const subscribed = web3InboxClient.isSubscribedToDapp(account, domain);

        web3InboxRegistered.set(registered);
        web3InboxSubscribed.set(subscribed);

        console.log(
          `!!Registered account ${account} ${registered}, subscribed: ${subscribed}`
        );

        web3InboxClient.setAccount(account);
        registerInbox();
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
      isLimited: isLimited,
    });

    web3InboxClient.watchAccount((account) => {
      console.log('Account changed from watch, registering', account);

      if (!web3InboxClient) return;

      web3InboxClient.register({ account, onSign, domain });
    });

    await web3InboxClient.setAccount(account as string);

    // await web3InboxClient.register({
    //   account,
    //   onSign,
    //   domain,
    // });

    // web3InboxClient.getSubscription(account, domain);

    const registered = await web3InboxClient.getAccountIsRegistered(
      account as string //TODO: Check if we need undefined account
    );
    web3InboxRegistered.set(registered);

    const isSubscribed = web3InboxClient.isSubscribedToDapp(account, domain);
    web3InboxSubscribed.set(isSubscribed);

    web3InboxLoading.set(false);

    console.log('!!Subscribed:', isSubscribed);
    console.log('!!Account: ', account);

    if (isSubscribed) registerInbox();
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

export async function registerInbox() {
  console.log('Registering inbox & triggering sign or log-in');
  if (!web3InboxClient) {
    console.error('Register called with no Client, abort sign');
    return;
  }
  web3InboxEnabling.set(true);

  const account = getWeb3InboxAccount();

  await web3InboxClient
    .register({
      account,
      domain,
      onSign,
    })
    .then(() => {
      console.log('Registered inbox');
    })
    .catch((error) => {
      console.error('Error registering inbox:', error);
      web3InboxEnabling.set(false);
    });

  const registered = await web3InboxClient.getAccountIsRegistered(
    account as string
  );

  web3InboxRegistered.set(registered);

  if (!registered) throw new Error(`Can't register account ${account}`);

  let isSubscribed = false;
  //TODO: Fix this, this is brutal
  while (!isSubscribed) {
    await web3InboxClient.subscribeToDapp(account, domain);
    isSubscribed = web3InboxClient.isSubscribedToDapp(account, domain);
  }

  web3InboxSubscribed.set(isSubscribed);

  console.log(
    `Account ${account} is registered ${registered} and subscribed ${isSubscribed}`
  );
  await getInboxContent();
}

async function getInboxContent() {
  getNotificationTypes();
  getMessages();
  web3InboxEnabling.set(false);
}

async function getMessages() {
  if (!web3InboxClient) return;
  const account = getWeb3InboxAccount();
  const messages = web3InboxClient.getMessageHistory(account, domain);

  console.log('Messages:', messages);
  setupMessages(messages);
  web3InboxClient.watchMessages((m) => setupMessages(m), account, domain);
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
  const types = web3InboxClient.getNotificationTypes(
    getWeb3InboxAccount(),
    domain
  );
  const transformTypes = Object.values(types);
  console.log('Notification types:', transformTypes);
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
