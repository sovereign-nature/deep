import { Secret, sign, verify } from 'jsonwebtoken';

export function encodeJWT(payload: object, secret: Secret): string {
  return sign(payload, secret);
}

export function decodeJWT(token: string, secret: Secret) {
  return verify(token, secret);
}
