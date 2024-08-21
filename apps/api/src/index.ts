import { Context, Hono } from 'hono';
import { cors } from 'hono/cors';
import { cache } from 'hono/cache';
import { logger } from 'hono/logger';

// Importing routes
import assets from './routes/assets';
import highlights from './routes/highlights';
import claims, { claimsQueue } from './routes/claims';
import wallets from './routes/wallets';
import events from './routes/events';
import siwe from './routes/siwe';

const app = new Hono();

app.use(logger());
app.use(
  '/*',
  cors({
    //TODO: Underscore should disable unused warnings
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    origin: (origin, _c: Context) => {
      return origin.endsWith('.sovereignnature.com') ||
        origin.endsWith('.vercel.app') || //TODO: Harden by providing proper vercel pattern or by moving Vercel to staging environment
        origin.includes('localhost') //TODO: Should we allow localhost origin in prod? https://hono.dev/docs/middleware/builtin/cors#environment-dependent-cors-configuration
        ? origin
        : 'https://real.sovereignnature.com';
    },
    credentials: true,
  })
);

app.get(
  '/assets/*',
  cache({
    cacheName: 'deep-api',
    cacheControl: 'max-age=60',
  })
);

app.get(
  '/highlights/*',
  cache({
    cacheName: 'deep-api',
    cacheControl: 'max-age=60',
  })
);

app.get(
  '/wallets/*',
  cache({
    cacheName: 'deep-api',
    cacheControl: 'max-age=60',
  })
);

app.get('/', (c) => c.text('DEEP API'));

app.route('/assets', assets);
app.route('/highlights', highlights);
app.route('/claims', claims);
app.route('/wallets', wallets);
app.route('/events', events);
app.route('/siwe', siwe);

// export default app;

export default {
  fetch: app.fetch,
  queue: claimsQueue,
};
