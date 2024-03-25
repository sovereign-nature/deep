import { expect, it } from 'vitest';
import { base64EncodeURL } from './utils';

it('base64Encode should encode valid string', () => {
  const encoded = base64EncodeURL(
    '{"email":"test@test.com","collection":"f5f7d73e-38b5-479d-a814-22c6d2199fcd"}'
  );
  expect(encoded).toEqual(
    'eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJjb2xsZWN0aW9uIjoiZjVmN2Q3M2UtMzhiNS00NzlkLWE4MTQtMjJjNmQyMTk5ZmNkIn0'
  );
});
