import { isDarkModePreferred, isFeatureEnabled } from '$lib/utils';
import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';
import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

import {
  chains,
  ethersConfig,
  projectId,
  themeVariablesDark,
  themeVariablesLight,
} from '$lib/config/web3Configs';

import { createWeb3Modal } from '@web3modal/ethers5';
import type { Web3Modal } from '@web3modal/ethers5/dist/types/src/client';

let web3Modal: Web3Modal;
const web3Connected = writable(false);
const web3Address = writable();
const web3ChainId = writable();

export function initializeModal() {
  web3Modal = createWeb3Modal({
    ethersConfig,
    projectId,
    chains,
    themeVariables: themeVariablesDark,
  });

  setContext('web3Modal', web3Modal);
  setContext('web3Connected', web3Connected);
  setContext('web3Address', web3Address);
  setContext('web3ChainId', web3ChainId);

  web3Modal.subscribeProvider(async ({ isConnected, address, chainId }) => {
    web3Connected.set(isConnected);
    if (isConnected) {
      web3Address.set(address);
      web3ChainId.set(chainId);
    }
  });
}

export function modalHandleTheme(theme: string) {
  if (isFeatureEnabled('walletEnabled')) {
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
}

export function getWeb3Modal() {
  return getContext('web3Modal') as Web3Modal;
}

export async function switchChain(id: string) {
  const provider = web3Modal.getWalletProvider();
  try {
    await provider.send('wallet_switchEthereumChain', [{ chainId: id }]);
  } catch (error) {
    console.error('Failed to switch chain:', error);
  }
}
export async function onSign(message: string) {
  if (!window) return '';
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const signature = await signer?.signMessage(message);
  return signature;
}

export function createSiweMessage(
  address: string,
  chainId: number,
  statement: string
) {
  const message = new SiweMessage({
    version: '1',
    domain: 'real.sovereignnature.com',
    uri: 'https://real.sovereignnature.com',
    address,
    chainId,
    statement,
  });
  return message.prepareMessage();
}
