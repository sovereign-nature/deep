import { expect, test } from 'vitest';
import app from '.';

test("/ should return 'DEEP API'", async () => {
  const res = await app.request('http://localhost/');
  expect(await res.text()).toBe('DEEP API');
});
