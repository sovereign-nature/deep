import { Context } from 'hono';

export function reportUnknownNetwork(e: unknown, c: Context) {
  if (e instanceof Error) {
    return c.json({ error: true, message: e.message }, 500);
  }

  return c.json({ error: true, message: 'Internal server error' }, 500);
}
