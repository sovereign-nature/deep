import { Context, Hono } from 'hono';
import { generateNonce, SiweMessage } from 'siwe';

import { Lucia, Session, User } from 'lucia';

import { env } from 'hono/adapter';
import { csrf } from 'hono/csrf';
import { session } from '../../middleware/session';

const app = new Hono<{
  Variables: {
    user: User | null;
    session: Session | null;
    lucia: Lucia;
  };
}>();

app.use(csrf({ origin: ['real.sovereignnature.com', 'localhost'] })); //TODO: Localhost in dev

app.use('*', session);

app.get('/nonce', (c) => {
  return c.text(generateNonce());
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

  const { data: message } = await siweMessage.verify({
    signature: body.signature,
    // nonce: session.nonce, //TODO: Add nonce to session
  });

  const address = message.address;
  const chainId = message.chainId;

  let session = c.get('session');

  if (!session) {
    console.log('Creating new session');
    await SESSIONS_DB.exec(
      `INSERT INTO user (id) VALUES ('${address}') ON CONFLICT DO NOTHING;`
    );

    session = await lucia.createSession(address, { chainId });

    c.header('Set-Cookie', lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });

    console.log('Session created', session);
  } else {
    console.log('Updating existing session');
    session.userId = address;
    session.chainId = chainId;
  }

  return c.text('true');
});

// Get the session
app.get('/session', (c) => {
  const session = c.get('session');

  if (!session) {
    return c.json({ message: 'No session found' }, 404);
  }

  return c.json({ address: session.userId, chainId: session.chainId });
});

app.get('/signout', (c) => {
  const session = c.get('session');
  const lucia = c.get('lucia');

  if (!session) {
    return c.json({ message: 'No session found' }, 404);
  }

  lucia.invalidateSession(session.id);

  return c.json({ message: 'Successfully signed out' });
});

export default app;
