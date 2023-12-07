import { PUBLIC_WALLET_CONNECT_PROJECT_ID } from '$env/static/public';
import config from '$lib/config/siteConfigs';
import { defaultConfig } from '@web3modal/ethers5';

if (!PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('VITE_PROJECT_ID is not set');
}

export const projectId = PUBLIC_WALLET_CONNECT_PROJECT_ID;

export const chains = [
  {
    chainId: 42161,
    name: 'Arbitrum',
    currency: 'ETH',
    explorerUrl: 'https://arbiscan.io',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
  },
  {
    chainId: 11155111,
    name: 'Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io/',

    rpcUrl: 'https://ethereum-sepolia.publicnode.com',
  },
];
// 3. Create modal
export const metadata = {
  name: config.siteName,
  description: config.siteDescription,
  url: 'https://real.sovereignnature.com/',
  icons: ['/android-chrome-192x192.png', '/android-chrome-512x512.png'],
};

export const ethersConfig = defaultConfig({ metadata, defaultChainId: 42161 });

export const themeVariablesDark = {
  '--w3m-font-family': 'Roboto, sans-serif',
  '--w3m-accent': '#01AC75',
  '--w3m-color-mix': '#002727',
  '--w3m-color-mix-strength': 40,
};
export const themeVariablesLight = {
  '--w3m-font-family': 'Roboto, sans-serif',
  '--w3m-accent': '#01AC75',
  '--w3m-color-mix': '#F5F5F5',
  '--w3m-color-mix-strength': 30,
};
