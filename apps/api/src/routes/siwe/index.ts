import { Context, Hono } from 'hono';
import { generateNonce, SiweMessage } from 'siwe';

import { env } from 'hono/adapter';
// import { csrf } from 'hono/csrf';
import { getCookie, setCookie } from 'hono/cookie';
import { csrf } from 'hono/csrf';
import { session, SessionVariables } from '$middleware/session';
import { addUser } from '$lib/db';
import { logger } from '$lib/logger';

const app = new Hono<{
  Variables: SessionVariables;
}>();

//TODO: Add CSRF protection
app.use(csrf({ origin: ['real.sovereignnature.com', 'localhost'] })); //TODO: Localhost in dev

app.use('*', session);

app.post('/nonce', (c) => {
  const nonce = generateNonce();

  //TODO: Fix sameSite and secure attributes for production
  setCookie(c, 'siwe-nonce', nonce, {
    sameSite: 'none',
    secure: true,
    // domain: 'api.sovereignnature.com',
  }); //TODO: Secure only in production, sameSite: 'none' in dev

  return c.text(nonce);
});

app.post('/verify', async (c) => {
  //TODO: Rename SESSIONS_DB to API_DB
  const { SESSIONS_DB } = env<{ SESSIONS_DB: D1Database }>(c as Context);
  const lucia = c.get('lucia');

  const body = await c.req.json();

  if (!body.message || !body.signature) {
    return c.json(
      { error: true, message: 'SIWE message and signature is required' },
      400
    );
  }

  const siweMessage = new SiweMessage(body.message);

  const nonce = getCookie(c, 'siwe-nonce');

  const { data: message } = await siweMessage.verify({
    signature: body.signature,
    nonce: nonce,
  });

  const address = message.address;
  const chainId = message.chainId;

  let session = c.get('session');

  if (!session) {
    logger.debug('Creating new session');

    await addUser(SESSIONS_DB, address);

    session = await lucia.createSession(address, { chainId });

    const cookie = lucia.createSessionCookie(session.id);
    setCookie(c, cookie.name, cookie.value, cookie.attributes);

    logger.debug('Session created', session);
  } else {
    logger.debug('Updating existing session');
    session.userId = address;
    session.chainId = chainId;
  }

  return c.text('true');
});

// Get the session
app.post('/session', (c) => {
  const session = c.get('session');

  if (!session) {
    return c.json({ message: 'No session found' }, 404);
  }

  return c.json({ address: session.userId, chainId: session.chainId });
});

app.post('/signout', async (c) => {
  const session = c.get('session');
  const lucia = c.get('lucia');

  if (!session) {
    return c.json({ message: 'No session found' }, 404);
  }

  await lucia.invalidateSession(session.id);
  logger.info('Session invalidated', { session });

  const cookie = lucia.createBlankSessionCookie();
  setCookie(c, cookie.name, cookie.value, cookie.attributes);

  return c.json({ message: 'Successfully signed out' });
});

export default app;
