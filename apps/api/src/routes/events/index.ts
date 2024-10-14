import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { nanoid } from 'nanoid';
import { events } from './config';
import { logger } from '$lib/logger';
import { AppContext } from '$lib/shared/types';

const app = new Hono<AppContext>();

app.get('/:eventId', async (c) => {
  c.res.headers.set('Cache-Control', 'no-store'); // Disable caching, maybe let's enable in production later

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
        id: nanoid(), //TODO: Should we secure this with cryptographically correct ID?
        collection: eventConfig.collectionId,
        seed,
      },
      c.env.CLAIMS_SECRET,
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
