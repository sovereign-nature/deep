import type { Page } from '@sveltejs/kit';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { Readable } from 'svelte/store';

interface TocEntry {
  title: string;
  id: string;
}

export const toc: Writable<TocEntry[]> = writable([]);
export const tocTitle: Writable<string> = writable('');

// Add entries to ToC
export function addToToc(title: string, id: string): void {
  const cleanedTitle =
    title && title.endsWith(':') ? title.slice(0, -1) : title;

  toc.update((tocEntries) => [...tocEntries, { title: cleanedTitle, id }]);
}
// Set the title of the TOC
export function setTocTitle(title: string): void {
  tocTitle.set(title);
}

// Subscribe to the page store and clear the toc store whenever the page changes
export function subscribeToPage(
  page: Readable<Page<Record<string, string>, string | null>>
): () => void {
  let currentPage: string | undefined;
  const unsubscribe = page.subscribe((value) => {
    // Ignore hash changes
    const pathWithoutHash = value.url.pathname + value.url.search;
    if (pathWithoutHash !== currentPage) {
      toc.set([]);
      currentPage = pathWithoutHash;
    }
  });

  return () => {
    unsubscribe();
  };
}
