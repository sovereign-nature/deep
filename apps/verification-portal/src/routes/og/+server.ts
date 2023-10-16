import { componentToImageResponse } from '$lib';
import OgCard from '$lib/components/OgCard.svelte';
import type { RequestHandler } from '@sveltejs/kit';
export const GET: RequestHandler = async ({ url }) => {
  const decodeQueryParam = (param: string) =>
    param ? decodeURIComponent(param) : undefined;

  const title = decodeQueryParam(url.searchParams.get('title')) || 'NFT';
  const funds = decodeQueryParam(url.searchParams.get('funds'));
  const tokenId = decodeQueryParam(url.searchParams.get('tokenId'));
  const img = decodeQueryParam(url.searchParams.get('img'));
  const source = decodeQueryParam(url.searchParams.get('source'));

  return componentToImageResponse(OgCard, {
    title,
    funds,
    tokenId,
    img,
    source,
  });
};
