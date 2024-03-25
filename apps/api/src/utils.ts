//https://gist.github.com/themikefuller/c1de46cbbdad02645b9dc006baedf88e
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
