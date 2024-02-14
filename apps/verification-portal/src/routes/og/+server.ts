import type { RequestHandler } from '@sveltejs/kit';
import type { SvelteComponent } from 'svelte';
import { getAssetImageUrl } from '@sni/clients/images-client';
import { componentToImageResponse } from '$lib/server/widgets/ComponentToImage';
import OgCard from '$lib/entities/OgShare/CardLandscape.svelte';
import OgCardSquare from '$lib/entities/OgShare/CardSquare.svelte';

const fontFile = await fetch(
  'https://cdn2.sovereignnature.com/fonts/clearface/Clearface-Serial-Med.woff'
);
const fontData: ArrayBuffer = await fontFile.arrayBuffer();
const robotoFile = await fetch(
  'https://cdn2.sovereignnature.com/fonts/roboto/Roboto-Regular.ttf'
);
const robotoData: ArrayBuffer = await robotoFile.arrayBuffer();
const robotoBoldFile = await fetch(
  'https://cdn2.sovereignnature.com/fonts/roboto/Roboto-Medium.ttf'
);
const robotoBoldData: ArrayBuffer = await robotoBoldFile.arrayBuffer();

//TODO: Proper error handling, tests
export const GET: RequestHandler = async ({ url }) => {
  const decodeQueryParam = (param: string | null) =>
    param ? decodeURIComponent(param) : undefined;

  const title: string =
    decodeQueryParam(url.searchParams.get('title')) || 'NFT';
  const funds: string = decodeQueryParam(url.searchParams.get('funds')) || '';
  const tokenId: string =
    decodeQueryParam(url.searchParams.get('tokenId')) || '';
  const img: string = getAssetImageUrl(
    decodeQueryParam(url.searchParams.get('img')) || '',
    500,
    500,
    'jpg'
  );
  const source: string = decodeQueryParam(url.searchParams.get('source')) || '';
  const ratio: string | undefined =
    decodeQueryParam(url.searchParams.get('ratio')) || 'landscape';
  const square: boolean = ratio === 'square' ? true : false;
  const width: number = square ? 1080 : 1200;
  const height: number = square ? 1080 : 630;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const component: SvelteComponent<any, any, any> = square
    ? (OgCardSquare as unknown as SvelteComponent<any, any, any>)
    : (OgCard as unknown as SvelteComponent<any, any, any>);
  /* eslint-enable @typescript-eslint/no-explicit-any */

  console.log('RENDERING');
  console.log('ratio', ratio);
  console.log('img', img);

  return componentToImageResponse(
    component,
    {
      title,
      funds,
      tokenId,
      img,
      source,
    },
    {
      width: width,
      height: height,
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
