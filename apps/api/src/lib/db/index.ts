import { drizzle } from 'drizzle-orm/better-sqlite3';
import { users } from './schemas';

//TODO: Move to a db file
export async function addUser(db: D1Database, address: string) {
  const orm = drizzle(db);

  return orm.insert(users).values({ id: address }).onConflictDoNothing();

  // return await db.exec(
  //   `INSERT INTO user (id) VALUES ('${address}') ON CONFLICT DO NOTHING;`
  // );
}
