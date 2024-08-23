import { Context, Hono } from 'hono';
import { generateNonce, SiweMessage } from 'siwe';

import { Lucia, Session, User } from 'lucia';

import { env } from 'hono/adapter';
// import { csrf } from 'hono/csrf';
import { getCookie, setCookie } from 'hono/cookie';
import { session } from '$middleware/session';
import { addUser } from '$lib/db';
import { logger } from '$lib/logger';

const app = new Hono<{
  Variables: {
    user: User | null;
    session: Session | null;
    lucia: Lucia;
  };
}>();

//TODO: Add CSRF protection
// app.use(csrf({ origin: ['real.sovereignnature.com', 'localhost'] })); //TODO: Localhost in dev

app.use('*', session);

app.post('/nonce', (c) => {
  const nonce = generateNonce();

  //TODO: Fix sameSite and secure attributes for production
  setCookie(c, 'siwe-nonce', nonce, { sameSite: 'none', secure: true }); //TODO: Secure only in production, sameSite: 'none' in dev
  return c.text(nonce);
});

app.post('/verify', async (c) => {
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

app.post('/signout', (c) => {
  const session = c.get('session');
  const lucia = c.get('lucia');

  if (!session) {
    return c.json({ message: 'No session found' }, 404);
  }

  lucia.invalidateSession(session.id);

  return c.json({ message: 'Successfully signed out' });
});

export default app;
