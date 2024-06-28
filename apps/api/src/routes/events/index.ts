import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { sign } from 'hono/jwt';
import { nanoid } from 'nanoid';
import { events } from './config';

const app = new Hono();

const getEventToken = app.get('/:eventId', async (c) => {
  const { CLAIMS_SECRET } = env<{ CLAIMS_SECRET: string }>(c);

  const eventId = c.req.param('eventId');

  console.log('eventId', eventId);

  try {
    const eventConfig = events[eventId];

    const token = await sign(
      {
        id: nanoid(),
        collection: eventConfig.collectionId,
        seed: eventConfig.seed(),
      },
      CLAIMS_SECRET,
      'HS256'
    );

    console.log('token', token);

    c.res.headers.set('Cache-Control', 'no-store');
    return c.redirect(
      `https://real.sovereignnature.com/?q=${eventConfig.realCollection}&claim=${token}`,
      301
    );
  } catch (e) {
    console.error(JSON.stringify(e)); //TODO: standardize error logging
    return c.json({ error: true, message: 'Event was not found' }, 404);
  }
});

export type GetAssetRoute = typeof getEventToken;

export default app;
