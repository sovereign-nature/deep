import {
  chains,
  ethersConfig,
  projectId,
  themeVariablesDark,
  themeVariablesLight,
} from '$lib/config/web3Configs';
import { isDarkModePreferred, isFeatureEnabled } from '$lib/utils';
import { BrowserProvider } from 'ethers';
import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

let web3Modal;
const modal = writable();
const web3Connected = writable(false);
const web3Address = writable();
const web3ChainId = writable();
const web3SelectedNetworkID = writable(undefined);
let pendingChainSwitch = false;

export function initializeContext() {
  setContext('web3Modal', modal);
  setContext('web3Connected', web3Connected);
  setContext('web3Address', web3Address);
  setContext('web3ChainId', web3ChainId);
  setContext('web3SelectedNetworkID', web3SelectedNetworkID);
}

export function initializeModal(createWeb3Modal, defaultConfig) {
  const modalConfig = defaultConfig({
    ethersConfig,
  });

  web3Modal = createWeb3Modal({
    modalConfig,
    projectId,
    chains,
    themeVariables: themeVariablesDark,
  });
  modal.set(web3Modal);
  setSubscriptions();
}

function setSubscriptions() {
  //Track network selected network to trigger chain switch after modal is connected or re-connected
  web3Modal.subscribeState(async ({ selectedNetworkId }) => {
    web3SelectedNetworkID.set(selectedNetworkId);
    if (selectedNetworkId && selectedNetworkId !== web3Modal.getChainId()) {
      pendingChainSwitch = true;
    } else {
      pendingChainSwitch = false;
    }
  });

  web3Modal.subscribeProvider(async ({ isConnected, address, chainId }) => {
    web3Connected.set(isConnected);
    if (isConnected) {
      web3Address.set(address);
      web3ChainId.set(chainId);
      if (
        pendingChainSwitch &&
        web3SelectedNetworkID &&
        web3SelectedNetworkID !== chainId
      ) {
        web3Modal.switchNetwork(web3SelectedNetworkID);
      }
    } else {
      web3Address.set(null);
      web3ChainId.set(null);
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

export async function onSign(message: string) {
  if (!window) return '';
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const signature = await signer?.signMessage(message);
  return signature;
}

export function getWeb3Modal() {
  return getContext('web3Modal') as Web3Modal;
}
