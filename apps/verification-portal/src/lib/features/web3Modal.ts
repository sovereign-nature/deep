import { createWeb3Modal } from '@web3modal/wagmi';
import { reconnect, watchAccount, signMessage } from '@wagmi/core';
import { setContext } from 'svelte';
import { writable } from 'svelte/store';
import { mainnet } from '@wagmi/core/chains';
import { isDarkModePreferred } from '$lib/shared/utils';
import {
  projectId,
  themeVariablesDark,
  themeVariablesLight,
  wagmiConfig,
} from '$lib/shared/web3Configs';

export type Web3Modal = ReturnType<typeof createWeb3Modal>;
let web3Modal: Web3Modal;

// Stores
const web3Connected = writable<boolean>(false);
const web3Address = writable<string>();
const web3ChainId = writable<number>();
const web3ModalOpen = writable<boolean>(false);

//TODO: Remove stores, infer state from web3Modal
// Stores initialization
export function initializeContext() {
  setContext('web3Connected', web3Connected);
  setContext('web3Address', web3Address);
  setContext('web3ChainId', web3ChainId);
  setContext('web3ModalOpen', web3ModalOpen);
}

export function initializeModal() {
  reconnect(wagmiConfig);

  web3Modal = createWeb3Modal({
    wagmiConfig,
    projectId,
    themeVariables: themeVariablesDark,
    defaultChain: mainnet,
    featuredWalletIds: [
      '9ce87712b99b3eb57396cc8621db8900ac983c712236f48fb70ad28760be3f6a',
      'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      '43fd1a0aeb90df53ade012cca36692a46d265f0b99b7561e645af42d752edb92',
    ],
  });
  if (web3Modal) {
    web3Modal.subscribeEvents((event) => {
      if (event.data.event === 'MODAL_OPEN') {
        web3ModalOpen.set(true);
      } else if (
        event.data.event === 'MODAL_CLOSE' ||
        event.data.event === 'CONNECT_SUCCESS'
      ) {
        web3ModalOpen.set(false);
      }
    });
  }

  console.log('web3Modal init', web3Modal);

  watchAccount(wagmiConfig, {
    onChange(account) {
      web3Connected.set(account.isConnected);

      if (account.address) {
        web3Address.set(account.address.toString());
      }

      web3ChainId.set(account.chainId ? account.chainId : 1);
    },
  });
}

export function modalHandleTheme(theme: string) {
  if (!web3Modal) return;
  if (theme === 'system') {
    if (isDarkModePreferred()) {
      web3Modal.setThemeMode('dark');
      web3Modal.setThemeVariables(themeVariablesDark);
    } else {
      web3Modal.setThemeMode('light');

      web3Modal.setThemeVariables(themeVariablesLight);
    }
  } else if (theme === 'dark') {
    web3Modal.setThemeMode('dark');
    web3Modal.setThemeVariables(themeVariablesDark);
  } else {
    web3Modal.setThemeMode('light');
    web3Modal.setThemeVariables(themeVariablesLight);
  }
}

export async function onSign(message: string) {
  console.log('Signing message:', message);

  const signature = await signMessage(wagmiConfig, { message });

  return signature;
}

export function getWeb3Modal(): Web3Modal {
  console.log('web3Modal getting', web3Modal);
  return web3Modal;
}
