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
  maxWords: number = 3
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
