import { getCookie, setCookie } from 'hono/cookie';

import { createMiddleware } from 'hono/factory';
import { initializeLucia } from '../lib/lucia';
import { logger } from '$lib/logger';
import { AppContext } from '$lib/shared/types';

/** Session middleware
 * @see {@link https://lucia-auth.com/guides/validate-session-cookies/hono}
 */

export const session = createMiddleware<AppContext>(async (c, next) => {
  const SESSIONS_DB = c.env.SESSIONS_DB;

  const lucia = initializeLucia(SESSIONS_DB);
  c.set('lucia', lucia);

  const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;

  logger.debug('SESSION ID:', sessionId);

  if (!sessionId) {
    c.set('user', null);
    c.set('session', null);

    logger.debug('NO SESSION ID');
    return next();
  }
  const { session, user } = await lucia.validateSession(sessionId);

  if (session && session.fresh) {
    const cookie = lucia.createSessionCookie(session.id);
    setCookie(c, cookie.name, cookie.value, cookie.attributes);
  }

  if (!session) {
    const cookie = lucia.createBlankSessionCookie();
    setCookie(c, cookie.name, cookie.value, cookie.attributes);
  }

  c.set('user', user);
  logger.info({ user });
  c.set('session', session);

  return next();
});
