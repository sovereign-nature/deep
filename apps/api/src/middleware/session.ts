import { Context, Next } from 'hono';
import { env } from 'hono/adapter';
import { getCookie } from 'hono/cookie';
import { initializeLucia } from '../lib/lucia';

/** Session middleware
 * @see {@link https://lucia-auth.com/guides/validate-session-cookies/hono}
 */
export async function session(c: Context, next: Next) {
  console.log('SESSION MIDDLEWARE');

  const { SESSIONS_DB } = env<{ SESSIONS_DB: D1Database }>(c as Context);

  const lucia = initializeLucia(SESSIONS_DB);

  console.log('sessionCookieName', lucia.sessionCookieName);

  const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;
  console.log('sessionId', sessionId);

  if (!sessionId) {
    c.set('user', null);
    c.set('session', null);

    console.log('NO SESSION ID');
    return next();
  }
  const { session, user } = await lucia.validateSession(sessionId);

  if (session && session.fresh) {
    // use `header()` instead of `setCookie()` to avoid TS errors
    c.header('Set-Cookie', lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });
  }

  if (!session) {
    c.header('Set-Cookie', lucia.createBlankSessionCookie().serialize(), {
      append: true,
    });
  }

  c.set('lucia', lucia);

  c.set('user', user);
  c.set('session', session);

  return next();
}
