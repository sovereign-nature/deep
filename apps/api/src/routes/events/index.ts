import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { sign } from 'hono/jwt';
import { nanoid } from 'nanoid';
import { events } from './config';
import { logger } from '$lib/logger';

const app = new Hono();

app.get('/:eventId', async (c) => {
  c.res.headers.set('Cache-Control', 'no-store'); // Disable caching, maybe let's enable in production later

  const { CLAIMS_SECRET } = env<{ CLAIMS_SECRET: string }>(c);

  const eventId = c.req.param('eventId');

  try {
    //TODO: Scope error handling for invalid eventIds
    const eventConfig = events[eventId];

    if (eventConfig.going === false) {
      return c.json(
        {
          error: true,
          message: "Event is already finished or it didn't start yet.",
        },
        400
      );
    }

    const seed = eventConfig.seed();
    const token = await sign(
      {
        id: nanoid(),
        collection: eventConfig.collectionId,
        seed,
      },
      CLAIMS_SECRET,
      'HS256'
    );

    return c.redirect(
      `https://real.sovereignnature.com/?q=${eventConfig.realCollection}&claim=${token}`,
      301
    );
  } catch (e) {
    logger.error(e);
    return c.json({ error: true, message: 'Event was not found' }, 404);
  }
});

export default app;
