import { dev } from '$app/environment';
import { PUBLIC_WALLET_CONNECT_PROJECT_ID } from '$env/static/public';
import config from '$lib/config/siteConfigs';

if (!PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('VITE_PROJECT_ID is not set');
}

export const projectId = PUBLIC_WALLET_CONNECT_PROJECT_ID;

const prodChains = [
  {
    chainId: 42161,
    name: 'Arbitrum',
    currency: 'ETH',
    explorerUrl: 'https://arbiscan.io',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
  },
  {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com',
  },
];

const devChains = [
  ...prodChains,
  {
    chainId: 11155111,
    name: 'Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io/',
    rpcUrl: 'https://ethereum-sepolia.publicnode.com',
  },
];

export const chains = dev ? devChains : prodChains;
// 3. Create modal
export const metadata = {
  name: config.siteName,
  description: config.siteDescription,
  image: '/android-chrome-512x512.png',
  url: 'https://real.sovereignnature.com/',
  icons: [
    'https://real.sovereignnature.com/android-chrome-192x192.png',
    'https://real.sovereignnature.com/android-chrome-512x512.png',
  ],
};

export const ethersConfig = { metadata, defaultChainId: 1, enableCoinbase: 0 };

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
