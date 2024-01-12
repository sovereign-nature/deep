import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';
import { get, writable } from 'svelte/store';

import { projectId } from '$lib/config/web3Configs';
import { onSign, type Web3Modal } from '$lib/web3Modal';
import type { NotifyClientTypes } from '@walletconnect/notify-client';
import { Web3InboxClient as Web3InboxConstructor } from '@web3inbox/core';

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

let web3InboxClient: Web3InboxConstructor | null = null;
let web3InboxAccount: string;
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

  if (!get(web3ModalStore).getIsConnected()) {
    console.log('!!!Web3 is not connected');
    return;
  }
}

async function connectToInbox() {
  console.log('!!!Connecting to inbox');
  try {
    web3InboxClient = await Web3InboxConstructor.init({
      projectId,
      domain,
      isLimited: isLimited,
    });

    web3InboxClient.watchAccount((account) => {
      web3InboxClient!.register({ account, onSign });
    });

    web3InboxClient.setAccount(getWeb3InboxAccount());

    configureInboxSubscription();
  } catch (error) {
    console.error('Error initializing inbox:', error);
  }
}

async function configureInboxSubscription() {
  if (!web3InboxClient) return connectToInbox();
  web3InboxAccount = getWeb3InboxAccount();
  await web3InboxClient.setAccount(web3InboxAccount);

  console.log('Account Set For', web3InboxClient.getAccount());

  const registered =
    await web3InboxClient.getAccountIsRegistered(web3InboxAccount);

  console.log('Registered status', registered);

  web3InboxRegistered.set(registered);
  registered && registerInbox();
  web3InboxLoading.set(false);
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

  try {
    await web3InboxClient
      .register({
        account: web3InboxAccount,
        domain,
        onSign,
      })
      .then(() => {
        console.log('Account registered successfully ');
        if (web3InboxClient) {
          const isSubscribed = web3InboxClient.isSubscribedToDapp(
            web3InboxAccount,
            domain
          );
          web3InboxSubscribed.set(isSubscribed);
          console.log('isSubscribed', isSubscribed);
          !isSubscribed && subscribeAndSetupInboxClient();
        }
      })
      .then(() => {
        console.log('Getting messages & types');
        getInboxContent();
      });
  } catch (error) {
    console.error('Error registering account:', error);
    console.log(`Account ${web3InboxAccount}`);
    console.log(`Client ${web3InboxClient}`);
    console.log(`Domain ${domain}`);
    console.log(`onSign ${onSign}`);
  }
}

function subscribeAndSetupInboxClient() {
  console.log('Subscribing to dApp');
  if (web3InboxClient) {
    web3InboxClient.subscribeToDapp(web3InboxAccount, domain);
    configureInboxSubscription();
  }
}

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
    web3InboxAccount,
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
