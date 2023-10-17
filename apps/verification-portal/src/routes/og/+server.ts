import { componentToImageResponse } from '$lib';
import OgCard from '$lib/components/OgCard.svelte';
import type { RequestHandler } from '@sveltejs/kit';
const fontFile = await fetch(
  'https://deep-real-git-feature-rea-9-dynamic-soc-154de8-sovereign-nature.vercel.app/fonts/Clearface-Serial-Med.woff'
); //@TODO replace with dedicated hosted fonts path
const fontData: ArrayBuffer = await fontFile.arrayBuffer();
const robotoFile = await fetch(
  'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf'
);
const robotoData: ArrayBuffer = await robotoFile.arrayBuffer();
export const GET: RequestHandler = async ({ url }) => {
  const decodeQueryParam = (param: string) =>
    param ? decodeURIComponent(param) : undefined;

  const title = decodeQueryParam(url.searchParams.get('title')) || 'NFT';
  const funds = decodeQueryParam(url.searchParams.get('funds'));
  const tokenId = decodeQueryParam(url.searchParams.get('tokenId'));
  const img = decodeQueryParam(url.searchParams.get('img'));
  const source = decodeQueryParam(url.searchParams.get('source'));
  return componentToImageResponse(
    OgCard,
    {
      title,
      funds,
      tokenId,
      img,
      source,
    },
    {
      fonts: [
        {
          data: fontData,
          name: 'Clearface Serial',
          weight: 400,
        },
        {
          data: robotoData,
          name: 'Roboto',
          weight: 500,
        },
      ],
    }
  );
};
