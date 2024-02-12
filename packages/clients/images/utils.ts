//TODO: Should we move it to utils package?
export function isUrl(url: string): boolean {
  return (
    url.toLowerCase().startsWith('https://') ||
    url.toLowerCase().startsWith('http://')
  );
}

//IPFS CID
export function getCID(url: string): string {
  return url.substring(7); // 'ipfs://'.length === 7
}

export function isIPFSUrl(url: string): boolean {
  return url !== undefined && url.startsWith('ipfs://');
}

export function getDomain(url: string): string {
  return new URL(url).hostname;
}
