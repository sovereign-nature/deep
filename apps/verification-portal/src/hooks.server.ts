import * as Sentry from '@sentry/sveltekit';
import { handleErrorWithSentry, sentryHandle } from '@sentry/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

Sentry.init({
  dsn: 'https://edc41182fe9540beb0e8a11b58b7172b@o4505997445824512.ingest.sentry.io/4505997447135232',
  tracesSampleRate: 1.0,
});

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(sentryHandle());

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
