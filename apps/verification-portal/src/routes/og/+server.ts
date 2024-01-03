import { componentToImageResponse } from '$lib';
import OgCard from '$lib/components/OgCard.svelte';
import type { RequestHandler } from '@sveltejs/kit';
const fontFile = await fetch(
  'https://cdn.sovereignnature.com/deep-real/fonts/clearface/Clearface-Serial-Med.woff'
);
const fontData: ArrayBuffer = await fontFile.arrayBuffer();
const robotoFile = await fetch(
  'https://cdn.sovereignnature.com/deep-real/fonts/roboto/Roboto-Regular.ttf'
);
const robotoData: ArrayBuffer = await robotoFile.arrayBuffer();
const robotoBoldFile = await fetch(
  'https://cdn.sovereignnature.com/deep-real/fonts/roboto/Roboto-Medium.ttf'
);
const robotoBoldData: ArrayBuffer = await robotoBoldFile.arrayBuffer();
export const GET: RequestHandler = async ({ url }) => {
  const decodeQueryParam = (param: string | null) =>
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
          weight: 400,
        },
        {
          data: robotoBoldData,
          name: 'Roboto',
          weight: 500,
        },
      ],
    }
  );
};
