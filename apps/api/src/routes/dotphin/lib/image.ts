import { CFImageUploadResponseSchema } from '../schemas';
import { evolutionImages, MAX_DOTPHIN_LEVEL } from '../config';
import { DOTphinElement, DOTphinLevel } from '../types';
import { getRandomInt } from '$lib/utils';

function levelToName(level: number) {
  return ['orbo', 'nix'][
    Math.min(level, MAX_DOTPHIN_LEVEL) - 1
  ] as DOTphinLevel;
}

export async function generateEvolutionImage(
  level: number,
  mainElement: DOTphinElement,
  proofsElements: DOTphinElement[],
  apiToken: string
) {
  console.log('Generating evolution image');
  console.log('Level', level);
  console.log('Main element', mainElement);
  console.log('Proofs elements', proofsElements);

  const API_URL =
    'https://api.cloudflare.com/client/v4/accounts/2ca8f087834868e70427f43cb09afcce/images/v1';

  const evolutionName = levelToName(level);
  const mainImage = evolutionImages[evolutionName].dotphin[mainElement];

  const draw = [];
  for (const element of proofsElements) {
    const imageUrl =
      evolutionImages[evolutionName].elements[element][getRandomInt(0, 2)];

    draw.push({ url: imageUrl });
  }

  console.log('Main Image', mainImage);
  console.log('Draw', draw);

  const composedImageResp = await fetch(mainImage, {
    cf: {
      image: {
        draw,
      },
    },
  });

  console.log('Composed Image Status', composedImageResp.status);
  //TODO: Handle error when composed image is not available

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

  //TODO: Handle error when can't upload image

  const uploadData = CFImageUploadResponseSchema.parse(await uploadResp.json());

  return `https://imagedelivery.net/TbEOGfUBcfmfflqdtuuZVA/${uploadData.result.id}/dotphin2560`;
}
