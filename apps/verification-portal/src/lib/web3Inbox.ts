import { projectId } from '$lib/config/web3Configs';
import { createSiweMessage, onSign } from '$lib/web3Modal';
import type { Web3InboxClient as InboxClientType } from '@web3inbox/core';
import { Web3InboxClient } from '@web3inbox/core';
import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';

let web3Connected: boolean;
let web3Address: string;
let web3ChainId: number;
let web3InboxClient: InboxClientType;
let web3InboxRegistered = false;

export async function initializeInbox() {
  const web3ConnectedStore: Writable<boolean> = getContext('web3Connected');
  const web3AddressStore: Writable<string> = getContext('web3Address');
  const web3ChainIdStore: Writable<number> = getContext('web3ChainId');

  web3ConnectedStore.subscribe((value) => {
    web3Connected = value;
    if (value) {
      createInboxClient();
    }
  });

  web3AddressStore.subscribe((value) => {
    web3Address = value;
  });

  web3ChainIdStore.subscribe((value) => {
    web3ChainId = value;
  });

  if (!web3Connected) return;
}

async function createInboxClient() {
  try {
    web3InboxClient = await Web3InboxClient.init({
      projectId: projectId,
      domain: 'real.sovereignnature.com',
      isLimited: process.env.NODE_ENV == 'production',
    });
    console.log('web3InboxClient', web3InboxClient);
    web3InboxRegistered = await web3InboxClient.getAccountIsRegistered(
      `eip155:${web3ChainId}:${web3Address}`
    );
  } catch (error) {
    console.error('Error initializing inbox:', error);
  }
}
export async function registerInbox() {
  console.log('Registering Inbox:', web3InboxClient);
  if (!web3InboxRegistered && web3InboxClient) {
    try {
      await web3InboxClient.register({
        account: `eip155:${web3ChainId}:${web3Address}`,
        domain: 'real.sovereignnature.com',
        onSign: () =>
          onSign(
            createSiweMessage(
              web3Address,
              web3ChainId,
              'I further authorize this app to send me notifications'
            )
          ),
      });

      //   web3InboxClient.watchAccount((account) => {});
    } catch (error) {
      console.error('Error registering account:', error);
    }
  }
}
