import { TokenStandard } from '@sni/address-utils';

export type CollectionConfig = {
  name: string;
  externalId: string;
  metadata: {
    description: string;
    image: string[];
    name: string;
    attributes?: { trait_type: string; value: string }[][];
  };
  network: string;
  tokenStandard: TokenStandard;
};

interface Collections {
  [key: string]: CollectionConfig;
}

const decodeBrusselsAttributes = [
  { trait_type: 'eventId', value: 'polkadot-decoded-2024' },
  {
    trait_type: 'eventURL',
    value: 'https://events.polkadot.network/event/polkadot-decoded-2024',
  },
  { trait_type: 'country', value: 'Belgium' },
  { trait_type: 'city', value: 'Brussels' },
  { trait_type: 'virtualEvent', value: 'false' },
  { trait_type: 'startDate', value: '11-Jul-2024' },
  { trait_type: 'endDate', value: '12-Jul-2024' },
  { trait_type: 'proofOf', value: 'attendance' },
];

export const collections: Collections = {
  '5f773e35-d5f2-41dc-ae80-c94e0e8e4821': {
    name: 'engie',
    externalId: '5f773e35-d5f2-41dc-ae80-c94e0e8e4821',
    metadata: {
      description:
        'To celebrate ENGIE\'s commitment to Corporate Social and Environmental Responsibility, the Sovereign Nature Initiative proudly introduces the "Dakhla Bay Collection 1.0" eco-badges, developed in collaboration with ENGIE. These eco-badges present digital art inspired by the marine life of Dakhla Bay. Each badge merges abstract patterns with empirical data from Aquasearch, incorporating acoustic recordings and observational data that algorithmically shape the artwork\'s color, geometry, and dynamics. Discover the unique story of the dolphin linked to your eco-badge and share its tale with your community!',
      image: [
        'ipfs://QmPz44sT22UUtJSrTnzC8mA7znF1vWd5U4ZmzzBnpvdHYE/dakhla_collection_final_',
      ],
      name: 'ENGIE Bioacoustics Eco-Badge',
    },
    network: 'optimism',
    tokenStandard: 'erc721',
  },
  'f5f7d73e-38b5-479d-a814-22c6d2199fcd': {
    name: 'test-collection',
    externalId: 'f5f7d73e-38b5-479d-a814-22c6d2199fcd',
    metadata: {
      description: 'Test collection',
      image: [
        'ipfs://QmPz44sT22UUtJSrTnzC8mA7znF1vWd5U4ZmzzBnpvdHYE/dakhla_collection_final_',
      ],
      name: 'ENGIE Bioacoustics Eco-Badge',
    },
    network: 'optimism',
    tokenStandard: 'erc721',
  },
  'dotphin-poap-testnet': {
    name: 'dotphin-poap-testnet',
    externalId: '3030',
    metadata: {
      description:
        'This is the first DOTphin Proof of Attendance!\nYour proof of attendance at Decoded 2024 in Brussels! This isn’t just any badge; it’s the key to unlocking your DOTphin journey. Get ready to dive into a world where your engagement drives real-world marine conservation.\nYour proof of attendance is the first step in making waves with DOTphin. This trailblazing project merges dynamic, evolving NFTs with sustainability, supporting marine conservation through every interaction. Join us in transforming community engagement and making a tangible impact on our oceans.',
      image: [
        'https://real.myfilebase.com/ipfs/QmagUnan8yPS7fFRL6hxk2VkdXbroD4AJGfLPDFzAgFEis/polkadot-decoded-2024-air.png',
        'https://real.myfilebase.com/ipfs/QmagUnan8yPS7fFRL6hxk2VkdXbroD4AJGfLPDFzAgFEis/polkadot-decoded-2024-earth.png',
        'https://real.myfilebase.com/ipfs/QmagUnan8yPS7fFRL6hxk2VkdXbroD4AJGfLPDFzAgFEis/polkadot-decoded-2024-water.png',
      ],
      name: 'DOTphin Proof of Attendance ‒ Decoded 2024',
      attributes: [
        [{ trait_type: 'element', value: 'air' }, ...decodeBrusselsAttributes],
        [
          { trait_type: 'element', value: 'earth' },
          ...decodeBrusselsAttributes,
        ],
        [
          { trait_type: 'element', value: 'water' },
          ...decodeBrusselsAttributes,
        ],
      ],
    },
    network: 'opal',
    tokenStandard: 'unique2',
  },
  'polkadot-decoded2024': {
    name: 'polkadot-decoded2024',
    externalId: '665',
    metadata: {
      description:
        'This is the first DOTphin Proof of Attendance!\nYour proof of attendance at Decoded 2024 in Brussels! This isn’t just any badge; it’s the key to unlocking your DOTphin journey. Get ready to dive into a world where your engagement drives real-world marine conservation.\nYour proof of attendance is the first step in making waves with DOTphin. This trailblazing project merges dynamic, evolving NFTs with sustainability, supporting marine conservation through every interaction. Join us in transforming community engagement and making a tangible impact on our oceans.',
      image: [
        'https://real.myfilebase.com/ipfs/QmagUnan8yPS7fFRL6hxk2VkdXbroD4AJGfLPDFzAgFEis/polkadot-decoded-2024-air.png',
        'https://real.myfilebase.com/ipfs/QmagUnan8yPS7fFRL6hxk2VkdXbroD4AJGfLPDFzAgFEis/polkadot-decoded-2024-earth.png',
        'https://real.myfilebase.com/ipfs/QmagUnan8yPS7fFRL6hxk2VkdXbroD4AJGfLPDFzAgFEis/polkadot-decoded-2024-water.png',
      ],
      name: 'DOTphin Proof of Attendance ‒ Decoded 2024',
      attributes: [
        [{ trait_type: 'element', value: 'air' }, ...decodeBrusselsAttributes],
        [
          { trait_type: 'element', value: 'earth' },
          ...decodeBrusselsAttributes,
        ],
        [
          { trait_type: 'element', value: 'water' },
          ...decodeBrusselsAttributes,
        ],
      ],
    },
    network: 'unique',
    tokenStandard: 'unique2',
  },
};
