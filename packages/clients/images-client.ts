import { SNI_API_URL, SNI_IMAGE_PROXY, SNI_IPFS_CACHE } from '@sni/constants';
import { ANIMAL_PLACEHOLDER } from '@sni/constants/cdn/placeholders';
import { getCID, getDomain, isIPFSUrl, isUrl } from '@sni/utils/url-utils';

export function getIPFSImageUrl(ipfsUrl: string): string {
  const cid = getCID(ipfsUrl);
  return `${SNI_IPFS_CACHE}/ipfs/${cid}`;
}
export const directusImageRequestConfig =
  '?format=webp&withoutEnlargement&quality=80';

export function getDirectusImageURL(
  assetID: string,
  width: number = 1000
): string {
  if (!assetID) {
    return ANIMAL_PLACEHOLDER;
  }

  return `${SNI_API_URL}/assets/${assetID}${directusImageRequestConfig}&width=${width}`;
}

export function getImgproxyUrl(url: string, width = 400): string {
  const domain = getDomain(url);

  //Avoid using the image proxy for Directus urls
  if (domain === getDomain(SNI_API_URL)) {
    return `${url}`;
  }

  return `${SNI_IMAGE_PROXY}/insecure/rs:fill/s:${width}:${width}/${btoa(url)}.webp`;
}

//TODO: Directus ID is not URL, probably refactoring is needed
export function getAssetUrl(url: string, width: number = 400): string {
  return getImgproxyUrl(
    isIPFSUrl(url)
      ? getIPFSImageUrl(url)
      : isUrl(url)
        ? url
        : getDirectusImageURL(url, width)
  );
}
