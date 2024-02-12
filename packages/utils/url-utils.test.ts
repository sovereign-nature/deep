import { expect, describe, it } from 'vitest';
import { getCID, getDomain, isIPFSUrl, isUrl } from './url-utils';

describe('isUrl', () => {
  it('should return true if the url starts with http://', () => {
    expect(isUrl('http://example.com')).toBe(true);
  });

  it('should return true if the url starts with https://', () => {
    expect(isUrl('https://example.com')).toBe(true);
  });

  it('should return false if the url does not start with http:// or https://', () => {
    expect(isUrl('example.com')).toBe(false);
  });
});

describe('isIPFSUrl', () => {
  it('should return true if the url starts with ipfs://', () => {
    expect(isIPFSUrl('ipfs://example.com')).toBe(true);
  });

  it('should return false if the url does not start with ipfs://', () => {
    expect(isIPFSUrl('example.com')).toBe(false);
  });
});

describe('getDomain', () => {
  it('should return the domain of the url', () => {
    expect(getDomain('http://example.com')).toBe('example.com');
  });
});

describe('getCID', () => {
  it('should return the CID of the IPFS url', () => {
    expect(getCID('ipfs://example.com')).toBe('example.com');
  });
});
