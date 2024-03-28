import { Secret, sign, verify } from 'jsonwebtoken';

export function encodeJWT(payload: object, secret: Secret): string {
  return sign(payload, secret);
}

export function decodeJWT(token: string, secret: Secret) {
  return verify(token, secret);
}

export function base64EncodeURL(url: string) {
  const utf8Encode = new TextEncoder();
  const byteArray = utf8Encode.encode(url);

  return btoa(
    Array.from(new Uint8Array(byteArray))
      .map((val) => {
        return String.fromCharCode(val);
      })
      .join('')
  )
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}
