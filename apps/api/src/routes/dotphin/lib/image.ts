import { DOTphinElement } from '$lib/shared/types';

export async function generateEvolutionImage(
  level: number,
  mainElement: DOTphinElement,
  proofsElements: string[],
  apiToken: string
) {
  console.log('Generating evolution image');
  console.log('Level', level);
  console.log('Main element', mainElement);
  console.log('Proofs elements', proofsElements);

  const API_URL =
    'https://api.cloudflare.com/client/v4/accounts/2ca8f087834868e70427f43cb09afcce/images/v1';

  const composedImageResp = await fetch(
    'https://cdn2.sovereignnature.com/images/dotphin/dotphin-nix/dotphins/dotphin-nix-air.png',
    {
      cf: {
        image: {
          draw: [
            {
              url: 'https://cdn2.sovereignnature.com/images/dotphin/dotphin-nix/elements/earth/element-nix-earth-02.png',
            },
          ],
        },
      },
    }
  );

  console.log('Image status', composedImageResp.status);

  const imageBytes = await composedImageResp.bytes();

  const formData = new FormData();
  formData.append('file', new File([imageBytes], 'tmp-dotphin-evolution.png'));

  const uploadResp = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    body: formData,
  });

  const uploadJson = await uploadResp.json();

  console.log('Upload response', uploadJson);

  return 'IMAGE_URL';
}
