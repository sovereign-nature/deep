// import { setContext } from 'svelte';
import { readable } from 'svelte/store';
import { isDarkModePreferred } from '$lib/shared/utils';

function getInitialTheme(): string {
  if (typeof window !== 'undefined' && localStorage.getItem('color-theme')) {
    return localStorage.getItem('color-theme') || 'system';
  }

  return 'system';
}

let setThemeStore: (value: string) => void;

export const themeStore = readable(getInitialTheme(), (set) => {
  setThemeStore = set;

  set(getInitialTheme());

  return () => {};
});

export function setTheme(value: string) {
  if (value === 'system') {
    localStorage?.removeItem('color-theme');
    document.documentElement.classList.toggle('dark', isDarkModePreferred());
  } else {
    localStorage?.setItem('color-theme', value);
    document.documentElement.classList.toggle('dark', value === 'dark');
  }

  setThemeStore(value);
}

// export function initThemeContext() {
//   setContext('theme', themeStore);
// }
