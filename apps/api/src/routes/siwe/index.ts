import { Context, Hono } from 'hono';
import { generateNonce, SiweMessage } from 'siwe';

import { DatabaseSessionAttributes, Lucia, Session, User } from 'lucia';
import { getCookie } from 'hono/cookie';
import { D1Adapter } from '@lucia-auth/adapter-sqlite';
import { env } from 'hono/adapter';
import { csrf } from 'hono/csrf';

export function initializeLucia(D1: D1Database) {
  const adapter = new D1Adapter(D1, {
    user: 'user',
    session: 'session',
  });
  return new Lucia(adapter, {
    getSessionAttributes: (attributes) => {
      const attr = attributes as DatabaseSessionAttributes;
      return {
        chainId: attr.chainId,
      };
    },
  });
}

declare module 'lucia' {
  interface Register {
    Lucia: ReturnType<typeof initializeLucia>;
  }
  interface DatabaseSessionAttributes {
    chainId: number;
  }
}

const app = new Hono<{
  Variables: {
    user: User | null;
    session: Session | null;
  };
}>();

app.use(csrf({ origin: ['real.sovereignnature.com', 'localhost'] })); //TODO: Localhost in dev

app.use('*', async (c, next) => {
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

  c.set('user', user);
  c.set('session', session);

  return next();
});

app.get('/nonce', (c) => {
  return c.text(generateNonce());
});

app.post('/verify', async (c) => {
  const { SESSIONS_DB } = env<{ SESSIONS_DB: D1Database }>(c as Context);
  const lucia = initializeLucia(SESSIONS_DB);

  const body = await c.req.json();

  try {
    if (!body.message || !body.signature) {
      return c.json(
        { error: true, message: 'SIWE message and signature is required' },
        400
      );
    }

    const siweMessage = new SiweMessage(body.message);

    const { data: message } = await siweMessage.verify({
      signature: body.signature,
      // nonce: session.nonce,
    });

    const address = message.address;
    const chainId = message.chainId;

    let session = c.get('session');

    if (!session) {
      SESSIONS_DB.exec(`INSERT INTO user (id) VALUES ('${address}');`);

      session = await lucia.createSession(address, { chainId });

      c.header(
        'Set-Cookie',
        lucia.createSessionCookie(session.id).serialize(),
        {
          append: true,
        }
      );
    } else {
      session.userId = address;
      session.chainId = chainId;
    }

    c.json({ message: 'Successfully verified' });
  } catch (e) {
    console.error(e);

    // const session = c.get('session');

    // session.siwe = null;
    // session.nonce = null;
    // session.save(() => res.status(500).json({ message: e.message }));
  }
});

// get the session
app.get('/session', (c) => {
  const session = c.get('session');

  if (!session) {
    return c.json({ message: 'No session found' }, 404);
  }

  return c.json({ address: session.userId, chainId: session.chainId });
});

//TODO: Add signout route

export default app;
