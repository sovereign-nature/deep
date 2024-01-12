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

const modal = writable();
let web3Modal;

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
    ...ethersConfig,
  });
  web3Modal = createWeb3Modal({
    ethersConfig: modalConfig,
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
}

export async function onSign(message: string) {
  console.log('Signing message:', message);
  if (!window) return '';
  const walletProvider = web3Modal.getWalletProvider();

  const ethersProvider = new BrowserProvider(walletProvider);
  console.log('Provider:', ethersProvider);

  const signer = await ethersProvider.getSigner();
  console.log('Signer:', signer);

  const signature = await signer?.signMessage(message);
  console.log('Signature:', signature);

  return signature;
}

export function getWeb3Modal() {
  return getContext('web3Modal') as Web3Modal;
}
