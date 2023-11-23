import { isDarkModePreferred } from '$lib/utils';
import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

import {
  chains,
  ethersConfig,
  metadata,
  projectId,
  themeVariablesDark,
  themeVariablesLight,
} from '$lib/web3Configs';
import { createWeb3Modal } from '@web3modal/ethers5';
import type { Web3Modal } from '@web3modal/ethers5/dist/types/src/client';

let web3Modal: Web3Modal;
const web3Connected = writable(false);
const web3Address = writable();
const web3ChainId = writable();

export function initializeModal() {
  web3Modal = createWeb3Modal({
    metadata,
    ethersConfig,
    projectId,
    chains,
    themeVariables: themeVariablesDark,
  });

  setContext('web3Modal', web3Modal);
  setContext('web3Connected', web3Connected);
  setContext('web3Address', web3Address);
  setContext('web3ChainId', web3ChainId);

  web3Modal.subscribeProvider(({ isConnected, address, chainId }) => {
    web3Connected.set(isConnected);
    web3Address.set(address);
    web3ChainId.set(chainId);
  });
}

export function modalHandleTheme(theme: string) {
  if (!web3Modal) return;
  if (theme === 'system') {
    web3Modal.setThemeMode(undefined);
    if (isDarkModePreferred()) {
      web3Modal.setThemeVariables(themeVariablesDark);
    } else {
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

export function getWeb3Modal() {
  return getContext('web3Modal') as Web3Modal;
}
