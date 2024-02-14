//TODO: Refactor utils dump

import { ANIMAL_PLACEHOLDER } from '@sni/constants/cdn/placeholders';
import type { DeepAsset } from '@sni/types';
import type { Page } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import config from '$lib/config/siteConfigs';
import type { FeaturesConfig } from '$lib/types';
import { directusUrl } from '@sni/clients/config';

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

export function updateQueryParams(
  param: string,
  value: string,
  navigate = false
) {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set(param, value);
  const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
  if (navigate) {
    goto(newUrl, { replaceState: true, keepFocus: true, noScroll: true });
  } else {
    // Replace the history state with the new URL
    goto(`?${queryParams.toString()}`, {
      replaceState: true,
      keepFocus: true,
      noScroll: true,
    });
  }
}

// Function to shuffle array randomly
export function shuffleArray(array: DeepAsset[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
