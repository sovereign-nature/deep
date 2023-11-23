import { isDarkModePreferred } from '$lib/utils';
import {
  chains,
  ethersConfig,
  metadata,
  projectId,
  themeVariablesDark,
  themeVariablesLight,
} from '$lib/web3Configs';
import { createWeb3Modal } from '@web3modal/ethers5';

let modal;

export function initializeModal() {
  modal = createWeb3Modal({
    metadata,
    ethersConfig,
    projectId,
    chains,
    themeVariables: themeVariablesDark,
  });
}

export function modalHandleTheme(theme) {
  if (!modal) return;

  if (theme === 'system') {
    modal.setThemeMode(undefined);
    if (isDarkModePreferred()) {
      modal.setThemeVariables(themeVariablesDark);
    } else {
      modal.setThemeVariables(themeVariablesLight);
    }
  } else if (theme === 'dark') {
    modal.setThemeMode('dark');
    modal.setThemeVariables(themeVariablesDark);
  } else {
    modal.setThemeMode('light');
    modal.setThemeVariables(themeVariablesLight);
  }
}
