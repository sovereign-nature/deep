import { ExternalApiError } from '@sni/types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const possibleDelays = [12960, 2160, 360, 60, 10];

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = 5
): Promise<unknown> {
  const response = await fetch(url, options);

  if (response.ok) {
    return await response.json();
  }

  const shouldRetry =
    (response.status >= 500 && response.status < 600) ||
    response.status === 429;

  if (retries > 0 && shouldRetry) {
    const nRetry = retries - 1;

    delay(possibleDelays[nRetry] || 1000);

    return fetchWithRetry(url, options, nRetry);
  }

  throw new ExternalApiError(`External API error: ${response.statusText}`);
}
