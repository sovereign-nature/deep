import { SNI_IMAGE_PROXY, SNI_IPFS_CACHE } from '@sni/constants';
//TODO: Move directus url to client config
import { ANIMAL_PLACEHOLDER } from '@sni/constants/cdn/placeholders';
import { getCID, getDomain, isIPFSUrl, isUrl } from '@sni/utils/url-utils';
import { directusUrl } from '../config';

export function getIPFSImageUrl(ipfsUrl: string): string {
  const cid = getCID(ipfsUrl);
  return `${SNI_IPFS_CACHE}/ipfs/${cid}`;
}
export const directusImageRequestConfig =
  '?format=webp&withoutEnlargement&quality=80';

export function getDirectusImageURL(
  assetID: string,
  width: number = 1000,
  format: 'webp' | 'jpg' = 'webp'
): string {
  if (!assetID) {
    return ANIMAL_PLACEHOLDER;
  }

  return `${directusUrl}/assets/${assetID}?format=${format}&withoutEnlargement&quality=80&width=${width}`;
}

export function getImgproxyUrl(
  url: string,
  width = 400,
  height = 400,
  format = 'webp'
): string {
  const domain = getDomain(url);

  //Avoid using the image proxy for Directus urls
  if (domain === getDomain(directusUrl)) {
    return `${url}`;
  }

  return `${SNI_IMAGE_PROXY}/insecure/rs:fill/s:${width}:${height}/${btoa(url)}.${format}`;
}

//TODO: Directus ID is not URL, probably refactoring is needed
export function getAssetImageUrl(
  url: string,
  width: number = 400,
  height = 400,
  format: 'webp' | 'jpg' = 'webp'
): string {
  if (!url) {
    return ANIMAL_PLACEHOLDER;
  }

  return getImgproxyUrl(
    isIPFSUrl(url)
      ? getIPFSImageUrl(url)
      : isUrl(url)
        ? url
        : getDirectusImageURL(url, width, format),
    width,
    height,
    format
  );
}
