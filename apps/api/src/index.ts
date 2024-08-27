import { Context } from 'hono';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { cache } from 'hono/cache';
import { logger } from 'hono/logger';
import { apiReference } from '@scalar/hono-api-reference';

// Importing routes
import assets from './routes/assets';
import highlights from './routes/highlights';
import claims, { claimsQueue } from './routes/claims';
import wallets from './routes/wallets';
import events from './routes/events';
import siwe from './routes/siwe';
import dotphin from './routes/dotphin';

const app = new OpenAPIHono();

// Middleware
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

// Cache
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

// OpenAPI spec
app.doc('/openapi', {
  openapi: '3.0.0',
  info: {
    version: '0.0.1',
    title: 'DEEP API',
  },
});

// API Reference
app.get(
  '/reference',
  apiReference({
    spec: {
      url: '/openapi',
    },
  })
);

// Routes
app.openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        description: 'Check if the API is up and running',
      },
    },
  }),
  (c) => c.text(`DEEP API`)
);

app.route('/assets', assets);
app.route('/highlights', highlights);
app.route('/claims', claims);
app.route('/wallets', wallets);
app.route('/events', events);
app.route('/siwe', siwe);
app.route('/dotphin', dotphin);

export default {
  fetch: app.fetch,
  queue: claimsQueue,
};
