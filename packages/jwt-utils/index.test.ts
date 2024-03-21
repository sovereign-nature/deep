import { expect, test } from 'vitest';
import { decodeJWT, encodeJWT } from '.';

const testToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJjb2xsZWN0aW9uIjoiZW5naWUiLCJpYXQiOjE3MTEwMjA5MTR9.ctpihwUaxJt3JPrnXkAZOFKWXr_NVU78Ugc_Sude_Ws';

const payload = { email: 'test@test.com', collection: 'engie' };

test('encode JWT token', () => {
  const token = encodeJWT(payload, 'secret');
  console.log(token);

  expect(typeof token === 'string').toBeTruthy();
});

test('decode JWT token', () => {
  const decoded = decodeJWT(testToken, 'secret');

  expect(decoded).toMatchObject(payload);
});

test('fail to decode JWT token with wrong secret', () => {
  expect(() => decodeJWT(testToken, 'wrong-secret')).toThrow();
});
