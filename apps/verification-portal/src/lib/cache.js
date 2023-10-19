// cache.js
const cache = new Map();

export function getFromCache(key) {
  const cacheEntry = cache.get(key);
  if (cacheEntry && cacheEntry.expires > Date.now()) {
    return cacheEntry.data;
  }
  return null;
}

export function setToCache(key, data, ttlInSeconds) {
  const expires = Date.now() + ttlInSeconds * 1000; // Convert seconds to milliseconds
  cache.set(key, { data, expires });
}
