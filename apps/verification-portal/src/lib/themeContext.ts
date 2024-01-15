import { setContext } from 'svelte';
import { writable } from 'svelte/store';
import { isDarkModePreferred } from './utils';

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('color-theme')) {
    return localStorage.getItem('color-theme');
  }
  return 'system';
};

const themeStore = writable(getInitialTheme());

//TODO: Why we need this custom theme store?
const theme = {
  subscribe: themeStore.subscribe,
  setTheme: (value: string) => {
    if (value === 'system') {
      localStorage?.removeItem('color-theme');
      document.documentElement.classList.toggle('dark', isDarkModePreferred());
    } else {
      localStorage?.setItem('color-theme', value);
      document.documentElement.classList.toggle('dark', value === 'dark');
    }
    themeStore.set(value);
  },
};
export function initThemeContext() {
  setContext('theme', theme);
}
