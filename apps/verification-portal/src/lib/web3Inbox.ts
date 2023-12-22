import type { Web3InboxClient as InboxClientType } from '@web3inbox/core';
import { Web3InboxClient } from '@web3inbox/core';
import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

import { projectId } from '$lib/config/web3Configs';
import { isFeatureEnabled } from '$lib/utils';
import { onSign } from '$lib/web3Modal';

let domain = 'real.sovereignnature.com';
let isLimited = process.env.NODE_ENV == 'production';

if (isFeatureEnabled('testGMInbox')) {
  domain = 'gm.walletconnect.com';
  isLimited = false;
}

const web3InboxMessages = writable();
const web3InboxTypes = writable();
const web3InboxRegistered = writable(false);
const web3InboxSubscribed = writable(false);
const web3InboxModalOpen = writable(false);
const web3InboxMessageCount = writable(0);
const web3InboxLoading = writable(true);

let web3Address: string;
let web3ChainId: number;
let web3Connected: boolean;
let web3InboxClient: InboxClientType | null;
let web3InboxAccount: string;

export async function initializeInbox() {
  const web3ConnectedStore: Writable<boolean> = getContext('web3Connected');
  const web3AddressStore: Writable<string> = getContext('web3Address');
  const web3ChainIdStore: Writable<number> = getContext('web3ChainId');

  web3ConnectedStore.subscribe((value) => {
    web3Connected = value;
    if (value) {
      console.log('Creating inbox client');
      createInboxClient();
    } else {
      console.log('Clearing inbox client');
      clearInboxClient();
    }
  });

  web3AddressStore.subscribe((value) => {
    web3Address = value;
    web3InboxClient !== null
      ? setupInboxClient()
      : console.log('Loading inbox address change');
  });

  web3ChainIdStore.subscribe((value) => {
    web3ChainId = value;
    web3InboxClient !== null
      ? setupInboxClient()
      : console.log('Loading inbox chain id change');
  });
  setContext('web3InboxMessages', web3InboxMessages);
  setContext('web3InboxTypes', web3InboxTypes);
  setContext('web3InboxRegistered', web3InboxRegistered);
  setContext('web3InboxSubscribed', web3InboxSubscribed);
  setContext('web3InboxModalOpen', web3InboxModalOpen);
  setContext('web3InboxMessageCount', web3InboxMessageCount);
  setContext('web3InboxLoading', web3InboxLoading);
  if (!web3Connected) return;
  createInboxClient();
}

async function createInboxClient() {
  try {
    web3InboxClient = await Web3InboxClient.init({
      projectId: projectId,
      domain: 'real.sovereignnature.com',
      isLimited: isLimited,
    });
    setupInboxClient();
  } catch (error) {
    console.error('Error initializing inbox:', error);
  }
}

async function setupInboxClient() {
  if (!web3InboxClient) {
    createInboxClient();
    return;
  }
  web3InboxAccount = `eip155:${web3ChainId}:${web3Address}`;
  const registered =
    await web3InboxClient.getAccountIsRegistered(web3InboxAccount);
  web3InboxRegistered.set(registered);
  console.log(registered, 'Registered status');

  if (registered) {
    registerInbox();
  }
  web3InboxLoading.set(false);
}

async function clearInboxClient() {
  console.log('Clearing inbox client');
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
  if (web3InboxClient) {
    try {
      await web3InboxClient
        .register({
          account: web3InboxAccount,
          domain: 'real.sovereignnature.com',
          onSign,
        })
        .then(() => {
          const isSubscribed = web3InboxClient.isSubscribedToDapp(
            web3InboxAccount,
            'real.sovereignnature.com'
          );

          web3InboxSubscribed.set(isSubscribed);
          if (!isSubscribed) {
            web3InboxClient.subscribeToDapp(
              web3InboxAccount,
              'real.sovereignnature.com'
            );
            console.log('Subscribing to dApp');
            setupInboxClient();
          }
        })
        .then(() => {
          console.log('Setting up inbox');
          setupInbox();
        });

      //   web3InboxClient.watchAccount((account) => {});
    } catch (error) {
      console.error('Error registering account:', error);
    }
  }
}
async function setupInbox() {
  getNotificationTypes();
  getMessages();
}
async function getMessages() {
  if (!web3InboxClient) return;
  const messages = web3InboxClient.getMessageHistory(
    `eip155:${web3ChainId}:${web3Address}`,
    domain
  );
  setupMessages(messages);
  web3InboxClient.watchMessages(
    (m) => setupMessages(m),
    web3InboxAccount,
    domain
  );
}

function setupMessages(messages: Array<object>) {
  messages = sortMessages(messages);
  web3InboxMessages.set(messages);
  web3InboxMessageCount.set(messages.length);
}

function sortMessages(messages: Array<object>) {
  return messages.sort((a, b) => b.publishedAt - a.publishedAt);
}

async function getNotificationTypes() {
  if (!web3InboxClient) return;
  const types = await web3InboxClient.getNotificationTypes(
    `eip155:${web3ChainId}:${web3Address}`,
    domain
  );
  const transformTypes = Object.values(types);
  web3InboxTypes.set(transformTypes);
}

export async function deleteMessage(id) {
  if (!web3InboxClient) return;

  try {
    //delete message, if success remove it from the list
    await web3InboxClient.deleteNotifyMessage({ id: id });
    getMessages();
  } catch (error) {
    console.error('Error deleting message:', error);
  }
}
