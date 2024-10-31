import { UniqueNetwork } from '@sni/types';
import { CollectionConfig } from '../claims/config'; //TODO: Move to shared
import { getRandomInt } from '$lib/utils';

export const MAX_DOTPHIN_LEVEL = 3;

const baseAttributes = [
  { trait_type: 'level', value: '1' },
  { trait_type: 'experience', value: '0' },
  { trait_type: 'type', value: 'orbo' },
];

const orboImages = {
  air: [
    'https://real.myfilebase.com/ipfs/QmbCKLNSdDUia33AQ8FvGc7UhrGsTuVbhnyPsPKfWUoexu/air/dotphin-orbo-air-0.png',
    'https://real.myfilebase.com/ipfs/QmbCKLNSdDUia33AQ8FvGc7UhrGsTuVbhnyPsPKfWUoexu/air/dotphin-orbo-air-1.png',
    'https://real.myfilebase.com/ipfs/QmbCKLNSdDUia33AQ8FvGc7UhrGsTuVbhnyPsPKfWUoexu/air/dotphin-orbo-air-2.png',
  ],
  earth: [
    'https://real.myfilebase.com/ipfs/QmbCKLNSdDUia33AQ8FvGc7UhrGsTuVbhnyPsPKfWUoexu/earth/dotphin-orbo-earth-0.png',
    'https://real.myfilebase.com/ipfs/QmbCKLNSdDUia33AQ8FvGc7UhrGsTuVbhnyPsPKfWUoexu/earth/dotphin-orbo-earth-1.png',
    'https://real.myfilebase.com/ipfs/QmbCKLNSdDUia33AQ8FvGc7UhrGsTuVbhnyPsPKfWUoexu/earth/dotphin-orbo-earth-2.png',
  ],
  water: [
    'https://real.myfilebase.com/ipfs/QmbCKLNSdDUia33AQ8FvGc7UhrGsTuVbhnyPsPKfWUoexu/water/dotphin-orbo-water-0.png',
    'https://real.myfilebase.com/ipfs/QmbCKLNSdDUia33AQ8FvGc7UhrGsTuVbhnyPsPKfWUoexu/water/dotphin-orbo-water-1.png',
    'https://real.myfilebase.com/ipfs/QmbCKLNSdDUia33AQ8FvGc7UhrGsTuVbhnyPsPKfWUoexu/water/dotphin-orbo-water-2.png',
  ],
};

const levelNames = ['orbo', 'nix', 'naia '];

export function getLevelName(level: number): string {
  return levelNames[level - 1];
}

const cdnFolder = 'https://cdn2.sovereignnature.com/images/dotphin';

type EvolutionImages = {
  dotphin: {
    air: string;
    earth: string;
    water: string;
  };
  elements: {
    air: string[];
    earth: string[];
    water: string[];
  };
};

interface DOTphinEvolutions {
  [key: string]: EvolutionImages;
}

export const evolutionImages: DOTphinEvolutions = {
  nix: {
    dotphin: {
      air: `${cdnFolder}/dotphin-nix/dotphins/dotphin-nix-air.png`,
      earth: `${cdnFolder}/dotphin-nix/dotphins/dotphin-nix-earth.png`,
      water: `${cdnFolder}/dotphin-nix/dotphins/dotphin-nix-water.png`,
    },
    //https://cdn2.sovereignnature.com/images/dotphin/dotphin-nix/elements/air/element-nix-air-01.png
    elements: {
      air: [
        `${cdnFolder}/dotphin-nix/elements/air/element-nix-air-01.png`,
        `${cdnFolder}/dotphin-nix/elements/air/element-nix-air-02.png`,
        `${cdnFolder}/dotphin-nix/elements/air/element-nix-air-03.png`,
      ],
      earth: [
        `${cdnFolder}/dotphin-nix/elements/earth/element-nix-earth-01.png`,
        `${cdnFolder}/dotphin-nix/elements/earth/element-nix-earth-02.png`,
        `${cdnFolder}/dotphin-nix/elements/earth/element-nix-earth-03.png`,
      ],
      water: [
        `${cdnFolder}/dotphin-nix/elements/water/element-nix-water-01.png`,
        `${cdnFolder}/dotphin-nix/elements/water/element-nix-water-02.png`,
        `${cdnFolder}/dotphin-nix/elements/water/element-nix-water-03.png`,
      ],
    },
  },
  naia: {
    dotphin: {
      air: `${cdnFolder}/dotphin-naia/dotphins/dotphin-naia-air.png`,
      earth: `${cdnFolder}/dotphin-naia/dotphins/dotphin-naia-earth.png`,
      water: `${cdnFolder}/dotphin-naia/dotphins/dotphin-naia-water.png`,
    },
    elements: {
      air: [
        `${cdnFolder}/dotphin-naia/elements/air/element-naia-air-01.png`,
        `${cdnFolder}/dotphin-naia/elements/air/element-naia-air-02.png`,
        `${cdnFolder}/dotphin-naia/elements/air/element-naia-air-03.png`,
      ],
      earth: [
        `${cdnFolder}/dotphin-naia/elements/earth/element-naia-earth-01.png`,
        `${cdnFolder}/dotphin-naia/elements/earth/element-naia-earth-02.png`,
        `${cdnFolder}/dotphin-naia/elements/earth/element-naia-earth-03.png`,
      ],
      water: [
        `${cdnFolder}/dotphin-naia/elements/water/element-naia-water-01.png`,
        `${cdnFolder}/dotphin-naia/elements/water/element-naia-water-02.png`,
        `${cdnFolder}/dotphin-naia/elements/water/element-naia-water-03.png`,
      ],
    },
  },
};

export function getDotphinCollectionConfig(
  collectionId: string,
  network: UniqueNetwork
): CollectionConfig {
  const imageSeed = getRandomInt(0, 2);
  return {
    name: 'DOTphin',
    externalId: collectionId,
    network,
    metadata: {
      name: 'DOTphin',
      description:
        "Beneath the depths of the Polkadot ecosystem, something extraordinary lurks - the enigmatic DOTphin. This mystical being embodies the essence of nature, continuously growing and transforming. The adventure commences with Orbo, a powerful symbol of life's boundless potential. Orbo serves as a blank canvas from which all aspects of existence emerge, a primal Orb pulsating with promise. It signifies the genesis of life's endless opportunities.",
      image: [
        orboImages.air[imageSeed],
        orboImages.earth[imageSeed],
        orboImages.water[imageSeed],
      ],
      attributes: [
        [{ trait_type: 'mainElement', value: 'air' }, ...baseAttributes],
        [{ trait_type: 'mainElement', value: 'earth' }, ...baseAttributes],
        [{ trait_type: 'mainElement', value: 'water' }, ...baseAttributes],
      ],
    },
    tokenStandard: 'unique2',
  };
}
