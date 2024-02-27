import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { cache } from 'hono/cache';
import assets from './routes/assets';
import highlights from './routes/highlights';

const app = new Hono();

app.use('/*', cors({ origin: '*' }));

app.get(
  '*',
  cache({
    cacheName: 'deep-api',
    cacheControl: 'max-age=3600',
  })
);

app.get('/', (c) => c.text('DEEP API'));

app.route('/assets', assets);
app.route('/highlights', highlights);

export default app;
