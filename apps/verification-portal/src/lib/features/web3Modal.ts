import { createWeb3Modal } from '@web3modal/wagmi';
import { reconnect, watchAccount, signMessage } from '@wagmi/core';
import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';
import { mainnet } from '@wagmi/core/chains';
import { isDarkModePreferred } from '$lib/shared/utils';
import {
  projectId,
  themeVariablesDark,
  themeVariablesLight,
  wagmiConfig,
} from '$lib/shared/web3Configs';

let web3Modal: Web3Modal;

// Stores
export type Web3Modal = ReturnType<typeof createWeb3Modal>;
const modal = writable<Web3Modal>(); //TODO: Can it be a singleton?

const web3Connected = writable<boolean>(false);
const web3Address = writable<string>();
const web3ChainId = writable<number>();

// Stores initialization
export function initializeContext() {
  setContext('web3Modal', modal);
  setContext('web3Connected', web3Connected);
  setContext('web3Address', web3Address);
  setContext('web3ChainId', web3ChainId);
}

export function initializeModal() {
  reconnect(wagmiConfig);

  web3Modal = createWeb3Modal({
    wagmiConfig,
    projectId,
    themeVariables: themeVariablesDark,
    defaultChain: mainnet,
  });

  modal.set(web3Modal);

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

export function getWeb3Modal() {
  return getContext('web3Modal') as ReturnType<typeof createWeb3Modal>;
}
