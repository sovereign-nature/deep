import { dev } from '$app/environment';
import { setLocale } from '$lib/i18n/i18n-svelte';
import { loadLocaleAsync } from '$lib/i18n/i18n-util.async';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

inject({ mode: dev ? 'development' : 'production' });
if (!dev) injectSpeedInsights();

export const load = async ({ url }) => {
  const { pathname } = url;
  await loadLocaleAsync('en');
  setLocale('en');
  return {
    pathname,
  };
};
