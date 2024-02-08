import { arbitrum } from 'viem/chains';

import { PUBLIC_WALLET_CONNECT_PROJECT_ID } from '$env/static/public';
import config from '$lib/config/siteConfigs';
import { defaultWagmiConfig } from '@web3modal/wagmi';

if (!PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('VITE_PROJECT_ID is not set');
}

export const projectId = PUBLIC_WALLET_CONNECT_PROJECT_ID;

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

export const chains = [arbitrum] as const;

export const wagmiConfig = defaultWagmiConfig({
  projectId,
  chains,
  metadata,
});
