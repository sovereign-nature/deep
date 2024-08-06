import { DatabaseSessionAttributes, Lucia } from 'lucia';
import { D1Adapter } from '@lucia-auth/adapter-sqlite';

export function initializeLucia(db: D1Database) {
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

export async function addUser(db: D1Database, address: string) {
  return await db.exec(
    `INSERT INTO user (id) VALUES ('${address}') ON CONFLICT DO NOTHING;`
  );
}
