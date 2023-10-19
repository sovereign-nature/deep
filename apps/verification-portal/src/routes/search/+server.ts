import { getFromCache, setToCache } from '$lib/cache';
import { SNI_API_URL } from '@sni/constants';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

const SEARCH_API_ENDPOINT = `${SNI_API_URL}/items/`;

export const GET: RequestHandler = async ({ url }) => {
  try {
    const searchQuery = url.searchParams.get('q');
    const collection = url.searchParams.get('collection') || 'hotel_hideaway';
    const cacheKey = `search:${searchQuery}-${collection}`;
    const cacheTTLInSeconds = 60 * 5; // Cache data for 5 minutes (adjust as needed)

    // Check if data is in cache and not expired
    const cachedData = getFromCache(cacheKey);
    if (cachedData) {
      return json(cachedData);
    }

    // If not in cache or expired, fetch from API
    const response = await fetch(
      `${SEARCH_API_ENDPOINT}/${collection}/?search=${searchQuery}`
    );

    if (response.ok) {
      const data = await response.json();
      // Cache the data with a specific expiration time
      setToCache(cacheKey, data, cacheTTLInSeconds);
      return json(data);
    } else {
      return json({ error: 'Failed to fetch data from the API' }, 500);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return json({ error: 'Internal server error' }, 500);
  }
};
