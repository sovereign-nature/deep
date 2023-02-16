export function prepareURL(url: string) {
  return url.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/');
}
