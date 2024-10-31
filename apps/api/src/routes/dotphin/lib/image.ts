import { CFImageUploadResponseSchema } from '../schemas';
import { evolutionImages, levelNames, MAX_DOTPHIN_LEVEL } from '../config';
import { DOTphinElement, DOTphinLevel } from '../types';
import { getRandomInt } from '$lib/utils';

function levelToName(level: number): DOTphinLevel {
  return levelNames[Math.min(level, MAX_DOTPHIN_LEVEL) - 1] as DOTphinLevel;
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

  console.log('Evolution Name', evolutionName);

  //Deep copy the images object
  const images = JSON.parse(JSON.stringify(evolutionImages));

  const mainImage = images[evolutionName].dotphin[mainElement];

  const draw = [];
  for (const element of proofsElements) {
    const elementImages = images[evolutionName].elements[element];

    const elementIndex = getRandomInt(0, elementImages.length - 1);
    const imageUrl = elementImages.splice(elementIndex, 1)[0];

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
