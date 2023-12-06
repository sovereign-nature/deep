import { projectId } from '$lib/config/web3Configs';
import { Web3InboxClient } from '@web3inbox/core';
import { writable } from 'svelte/store';

const web3Account = writable();
const web3Subscription = writable();
const web3Messages = writable();

export async function initializeInbox() {
  const web3InboxClient = await Web3InboxClient.init({
    projectId: projectId,
    domain: 'gm.walletconnect.com',
    isLimited: false,
  });

  web3InboxClient.watchAccount((account) => {
    web3Account.set(account);
    web3InboxClient.register({
      account,
      onSign,
    });
  });

  await web3InboxClient.setAccount(
    'eip155:1:0xa7129173A57a21316B0785740f9F619fd17b74fD'
  );

  const subscription = web3InboxClient.getSubscription();
  web3InboxClient.watchSubscription((subscription) => {
    web3Subscription.set(subscription);
    console.log({ subscription });
  });

  await web3InboxClient.subscribeToDapp();

  const messages = web3InboxClient.getMessageHistory();
  web3Messages.set(messages);

  return {
    web3InboxClient,
    web3Account,
    web3Subscription,
    web3Messages,
    subscription,
  };
}
