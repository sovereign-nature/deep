//TODO: Should it be renamed?

import { getContext } from 'hono/context-storage';
import { logger } from '../logger';
import { AppContext } from './types';

export function errorResponse(e: unknown) {
  const c = getContext<AppContext>();

  if (e instanceof Error) {
    logger.error(e);
  }

  return c.json({ error: true, message: 'Internal server error' }, 500);
}
