import { Context } from 'hono';
import { logger } from './logger';

export function errorResponse(e: unknown, c: Context) {
  if (e instanceof Error) {
    logger.error(e);
  }

  return c.json({ error: true, message: 'Internal server error' }, 500);
}
