import { DatabaseSessionAttributes, Lucia } from 'lucia';
import { D1Adapter } from '@lucia-auth/adapter-sqlite';

import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/better-sqlite3';

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

const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  //TODO: Add email, telegram, etc.
});

//TODO: Move to a db file
export async function addUser(db: D1Database, address: string) {
  const orm = drizzle(db);

  return orm.insert(users).values({ id: address }).onConflictDoNothing();

  // return await db.exec(
  //   `INSERT INTO user (id) VALUES ('${address}') ON CONFLICT DO NOTHING;`
  // );
}
