import { readable } from 'svelte/store';
import { isDarkModePreferred } from '$lib/shared/utils';
export type Theme = 'light' | 'dark' | 'system' | undefined;

function getInitialTheme(): Theme {
  if (typeof window !== 'undefined' && localStorage.getItem('color-theme')) {
    return (localStorage.getItem('color-theme') as Theme) || 'system';
  }

  return 'system';
}

let setThemeStore: (value: Theme) => void;

export const themeStore = readable<Theme>(getInitialTheme(), (set) => {
  setThemeStore = set;

  set(getInitialTheme());

  return () => {};
});

export function setTheme(value: Theme) {
  if (value === 'system') {
    localStorage?.removeItem('color-theme');
    document.documentElement.classList.toggle('dark', isDarkModePreferred());
  } else {
    localStorage?.setItem('color-theme', value ?? '');
    document.documentElement.classList.toggle('dark', value === 'dark');
  }

  setThemeStore(value);
}
