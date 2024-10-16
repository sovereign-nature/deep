import { UniqueNetwork } from '@sni/types';
import { CollectionConfig } from '../claims/config'; //TODO: Move to shared
import { getRandomInt } from '$lib/utils';

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

const levelNames = ['orbo', 'nix'];

export function getLevelName(level: number): string {
  return levelNames[level - 1];
}

export const evolutionImages = {
  nix: {
    dotphin: {
      air: 'https://real.myfilebase.com/ipfs/QmdSGvyzcXXCWZ33rV5FHEW1Siqenj3QEt7jMhtuq5Wok5/dotphins/dotphin-nix-air.png',
      earth:
        'https://real.myfilebase.com/ipfs/QmdSGvyzcXXCWZ33rV5FHEW1Siqenj3QEt7jMhtuq5Wok5/dotphins/dotphin-nix-earth.png',
      water:
        'https://real.myfilebase.com/ipfs/QmdSGvyzcXXCWZ33rV5FHEW1Siqenj3QEt7jMhtuq5Wok5/dotphins/dotphin-nix-water.png',
    },
    elements: {
      air: [
        'https://real.myfilebase.com/ipfs/QmdSGvyzcXXCWZ33rV5FHEW1Siqenj3QEt7jMhtuq5Wok5/elements/air/element-nix-air-01.png',
        'https://real.myfilebase.com/ipfs/QmdSGvyzcXXCWZ33rV5FHEW1Siqenj3QEt7jMhtuq5Wok5/elements/air/element-nix-air-02.png',
        'https://real.myfilebase.com/ipfs/QmdSGvyzcXXCWZ33rV5FHEW1Siqenj3QEt7jMhtuq5Wok5/elements/air/element-nix-air-03.png',
      ],
      earth: [
        'https://real.myfilebase.com/ipfs/QmdSGvyzcXXCWZ33rV5FHEW1Siqenj3QEt7jMhtuq5Wok5/elements/earth/nix-earth-01.png',
        'https://real.myfilebase.com/ipfs/QmdSGvyzcXXCWZ33rV5FHEW1Siqenj3QEt7jMhtuq5Wok5/elements/earth/nix-earth-02.png',
        'https://real.myfilebase.com/ipfs/QmdSGvyzcXXCWZ33rV5FHEW1Siqenj3QEt7jMhtuq5Wok5/elements/earth/nix-earth-03.png',
      ],
      water: [
        'https://real.myfilebase.com/ipfs/QmdSGvyzcXXCWZ33rV5FHEW1Siqenj3QEt7jMhtuq5Wok5/elements/water/element-nix-water-01.png',
        'https://real.myfilebase.com/ipfs/QmdSGvyzcXXCWZ33rV5FHEW1Siqenj3QEt7jMhtuq5Wok5/elements/water/element-nix-water-02.png',
        'https://real.myfilebase.com/ipfs/QmdSGvyzcXXCWZ33rV5FHEW1Siqenj3QEt7jMhtuq5Wok5/elements/water/element-nix-water-03.png',
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
