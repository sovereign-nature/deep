import { expect, test, describe, it } from 'vitest';
import { SNI_API_URL, SNI_IMAGE_PROXY, SNI_IPFS_CACHE } from '@sni/constants';
import {
  directusImageRequestConfig,
  getAssetUrl,
  getDirectusImageURL,
  getIPFSImageUrl,
  getImgproxyUrl,
} from './images-client';

test('getIPFSImageUrl', () => {
  expect(getIPFSImageUrl('ipfs://123')).toBe(`${SNI_IPFS_CACHE}/ipfs/123`);
});

test('getDirectusImageURL', () => {
  expect(getDirectusImageURL('123', 500)).toBe(
    `${SNI_API_URL}/assets/123${directusImageRequestConfig}&width=500`
  );
});

test('getImgproxyUrl', () => {
  expect(getImgproxyUrl('https://example.com/image.jpg', 200)).toBe(
    `${SNI_IMAGE_PROXY}/insecure/rs:fill/s:200:200/aHR0cHM6Ly9leGFtcGxlLmNvbS9pbWFnZS5qcGc=.webp`
  );
});

describe('getAssetUrl', () => {
  it('should return imgproxy url for IPFS image', () => {
    expect(
      getAssetUrl('ipfs://QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE')
    ).toBe(
      `${SNI_IMAGE_PROXY}/insecure/rs:fill/s:400:400/aHR0cHM6Ly9pbWFnZS5zb3ZlcmVpZ24ud29ya2Vycy5kZXYvaXBmcy9RbVFxek1UYXZRZ1Q0ZjRUNXY2UFdCcDdYTkt0b1BtQzlqdm4xMldQVDNna1NF.webp`
    );
  });

  it('should return imgproxy url for regular image', () => {
    expect(getAssetUrl('https://i.imgur.com/A0cJLgI.jpeg')).toBe(
      `${SNI_IMAGE_PROXY}/insecure/rs:fill/s:400:400/aHR0cHM6Ly9pLmltZ3VyLmNvbS9BMGNKTGdJLmpwZWc=.webp`
    );
  });

  it('should return directus image url', () => {
    expect(getAssetUrl('123', 200)).toBe(
      `${SNI_API_URL}/assets/123${directusImageRequestConfig}&width=200`
    );
  });
});
