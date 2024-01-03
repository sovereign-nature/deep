import type { FeaturesConfig } from '$lib/types';
import { ANIMAL_PLACEHOLDER } from '@sni/cdn/placeholders';
import type { Page } from '@sveltejs/kit';

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

import { SNI_IPFS_CACHE } from '@sni/constants';

export function generateIPFSImageUrl(ipfsUrl: string): string | null {
  const ipfsGateway = SNI_IPFS_CACHE;
  if (!ipfsUrl) {
    return null;
  }
  const cid = getCID(ipfsUrl);
  return `${ipfsGateway}/ipfs/${cid}`;
}

function getCID(url: string): string {
  return url.substring(7); // 'ipfs://'.length === 7
}

export function isIPFSUrl(url: string): boolean {
  return url.startsWith('ipfs://');
}

import { goto } from '$app/navigation';
import { SNI_API_URL } from '@sni/constants';

const API_BASE_URL = SNI_API_URL;
const imageRequestConfig = '?format=auto&withoutEnlargement&quality=80';

export function generateAssetURL(
  assetID: string,
  width: number = 1000
): string {
  if (!assetID) {
    return ANIMAL_PLACEHOLDER;
  }
  return `${API_BASE_URL}/assets/${assetID}${imageRequestConfig}&width=${width}`;
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

import type { AssetFeatured } from '$lib/types';

// Function to shuffle array randomly
export function shuffleArray(array: AssetFeatured[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

import { browser } from '$app/environment';

export function isDarkModePreferred() {
  if (browser) {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }
}

import config from '$lib/config/siteConfigs';
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
