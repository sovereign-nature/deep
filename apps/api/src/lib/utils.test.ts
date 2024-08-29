import { expect, test } from 'vitest';
import { getRandomInt } from './utils';

test('Test random generator', () => {
  const min = 1;
  const max = 10;
  const result = getRandomInt(min, max);
  expect(result).toBeGreaterThanOrEqual(min);
  expect(result).toBeLessThanOrEqual(max);
});
