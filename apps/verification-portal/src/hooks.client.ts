import * as Sentry from '@sentry/sveltekit';
import { Replay, handleErrorWithSentry } from '@sentry/sveltekit';
import { dev } from '$app/environment';

if (!dev) {
  Sentry.init({
    dsn: 'https://edc41182fe9540beb0e8a11b58b7172b@o4505997445824512.ingest.sentry.io/4505997447135232',
    tracesSampleRate: 1.0,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    // If you don't want to use Session Replay, just remove the line below:
    integrations: [new Replay()],
  });
}

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
