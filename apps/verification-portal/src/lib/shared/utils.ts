//TODO: Refactor utils dump
import { ANIMAL_PLACEHOLDER } from '@sni/constants/cdn/placeholders';
import { directusUrl } from '@sni/clients/config';

import type { Page } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import config from '$lib/shared/siteConfigs';
import type { FeaturesConfig } from '$lib/types';

export function shortenMoneyValue(value: string): string {
  const num = parseFloat(value);
  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'k';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';
  } else {
    return value;
  }
}

export function isLongTitle(
  title: string,
  maxLength: number = 9,
  maxWords: number = 2
): boolean {
  const words = title.split(' ');

  // Check if the number of words exceeds the specified limit
  if (words.length > maxWords) {
    return true;
  }

  // Check if any word exceeds the specified length
  for (const word of words) {
    if (word.length > maxLength) {
      return true;
    }
  }

  return false;
}

export function getBaseUrl(page: Page) {
  const { protocol, host } = page.url;
  return `${protocol}//${host}`;
}

//TODO: Move to the client package
export function generateMediaURL(assetID: string): string {
  if (!assetID) {
    return ANIMAL_PLACEHOLDER;
  }
  return `${directusUrl}/assets/${assetID}?metadata`;
}

export function updateQueryParams(param: string, value: string) {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set(param, value);

  // Replace the history state with the new URL
  goto(`/?${queryParams.toString()}`, {
    // replaceState: true,
    keepFocus: true,
    noScroll: true, //TODO: Noscroll is not working when switching between web2/web3 tabs
  });
}

export function clearQueryParam(
  param: string,
  replaceState: boolean = false,
  url: URL
) {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.delete(param);
  const newUrl = `${url.origin}${url.pathname}?${queryParams.toString()}`;
  goto(newUrl, {
    replaceState: replaceState,
    keepFocus: true,
    noScroll: true,
  });
}

export function isDarkModePreferred() {
  if (browser) {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }
}

export function isFeatureEnabled(feature: string) {
  let isEnabled = false;

  if (feature in config.feature) {
    isEnabled = (config.feature as FeaturesConfig)[feature]; // Use the value in the config if it exists
  } else {
    console.log(`Feature flag ${feature} not found in config`);
  }

  if (browser) {
    const featureFlagCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('feature_flag'));
    if (featureFlagCookie) {
      const featureState = JSON.parse(
        decodeURIComponent(featureFlagCookie.split('=')[1])
      );
      if (feature in featureState) {
        isEnabled = featureState[feature]; // Override with the value in the cookie
      }
    }
  }

  return isEnabled;
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}
export function setCookie(name: string, value: string) {
  const date = new Date();
  date.setMonth(date.getMonth() + 1); // Set the cookie to expire in 1 month
  document.cookie = `${name}=${value}; expires=${date.toUTCString()};path=/`;
}

export function shortenAddress(address: string, length = 4) {
  const regex = new RegExp(`^(.{${length}})(.*)(.{${length}})$`);

  return address.replace(regex, '$1...$3');
}
