import { DatabaseSessionAttributes, Lucia } from 'lucia';
import { D1Adapter } from '@lucia-auth/adapter-sqlite';

export function initializeLucia(db: D1Database) {
  //Replace with drizzle adapter https://lucia-auth.com/database/drizzle
  const adapter = new D1Adapter(db, {
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
    sessionCookie: { attributes: { sameSite: 'none' } }, //TODO: Add only on staging
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
