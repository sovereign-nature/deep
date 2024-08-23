import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/lib/db/schemas.ts',
  out: './sql/drizzle-migrations',
});
