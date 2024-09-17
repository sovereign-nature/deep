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

const edcon2024Attributes = [
  { trait_type: 'eventId', value: 'edcon-2024' },
  {
    trait_type: 'eventURL',
    value: 'https://www.edcon.io',
  },
  { trait_type: 'country', value: 'Japan' },
  { trait_type: 'city', value: 'Tokyo' },
  { trait_type: 'virtualEvent', value: 'false' },
  { trait_type: 'startDate', value: '24-Jul-2024' },
  { trait_type: 'endDate', value: '30-Jul-2024' },
  { trait_type: 'proofOf', value: 'attendance' },
];

const web3summit2024Attributes = [
  { trait_type: 'eventId', value: 'web3summit-2024' },
  {
    trait_type: 'eventURL',
    value: 'https://web3summit.com/',
  },
  { trait_type: 'country', value: 'Germany' },
  { trait_type: 'city', value: 'Berlin' },
  { trait_type: 'virtualEvent', value: 'false' },
  { trait_type: 'startDate', value: '19-Aug-2024' },
  { trait_type: 'endDate', value: '21-Aug-2024' },
  { trait_type: 'proofOf', value: 'presence' },
];

const polkadotTokyoParty2024Attributes = [
  { trait_type: 'eventId', value: 'polkadot-tokyo-party-2024' },
  {
    trait_type: 'eventURL',
    value: 'https://lu.ma/cxg61tpr',
  },
  { trait_type: 'country', value: 'Japan' },
  { trait_type: 'city', value: 'Tokyo' },
  { trait_type: 'virtualEvent', value: 'false' },
  { trait_type: 'startDate', value: '27-Aug-2024' },
  { trait_type: 'endDate', value: '27-Aug-2024' },
  { trait_type: 'proofOf', value: 'presence' },
];

const decodedAsia2024Attributes = [
  { trait_type: 'eventId', value: 'decoded-asia-2024' },
  {
    trait_type: 'eventURL',
    value: 'https://lu.ma/hszom0hw',
  },
  { trait_type: 'country', value: 'Singapore' },
  { trait_type: 'city', value: 'Singapore' },
  { trait_type: 'virtualEvent', value: 'false' },
  { trait_type: 'startDate', value: '16-Sep-2024' },
  { trait_type: 'endDate', value: '17-Sep-2024' },
  { trait_type: 'proofOf', value: 'presence' },
];

const token2049Singapore2024Attributes = [
  { trait_type: 'eventId', value: 'token2049-singapore-2024' },
  {
    trait_type: 'eventURL',
    value: 'https://www.asia.token2049.com/',
  },
  { trait_type: 'country', value: 'Singapore' },
  { trait_type: 'city', value: 'Singapore' },
  { trait_type: 'virtualEvent', value: 'false' },
  { trait_type: 'startDate', value: '18-Sep-2024' },
  { trait_type: 'endDate', value: '19-Sep-2024' },
  { trait_type: 'proofOf', value: 'presence' },
];

export const collections: Collections = {
  //ENGIE
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
  //TOKYO PARTY
  'testnet-polkadot-tokyo-party-2024': {
    name: 'testnet-polkadot-tokyo-party-2024',
    externalId: '3551',
    metadata: {
      description:
        "You've just unlocked the next chapter in your DOTphin journey with this exclusive Proof of Presence (PoP) from Polkadot WebX side event in Tokyo. Each interaction with the community not only enhances your DOTphin but also contributes to AI-driven research decoding whale songs in the Caribbean. This trailblazing project merges the playful evolution of your DOTphin with a meaningful mission to support marine conservation. Get ready to make a positive impact on our oceans—your presence here isn't just a step forward for you; it's a leap towards a more connected, nature-positive future.",
      image: [
        'https://real.myfilebase.com/ipfs/QmcikNxZxXdfoPJppUMeNkoseUUn6HVKN79kTFMEBmh6dD/polkadot-tokyo-party-2024-air.png',
        'https://real.myfilebase.com/ipfs/QmcikNxZxXdfoPJppUMeNkoseUUn6HVKN79kTFMEBmh6dD/polkadot-tokyo-party-2024-earth.png',
        'https://real.myfilebase.com/ipfs/QmcikNxZxXdfoPJppUMeNkoseUUn6HVKN79kTFMEBmh6dD/polkadot-tokyo-party-2024-water.png',
      ],
      name: 'DOTphin Proof of Presence ‒『POLKADOT』Tokyo Party',
      attributes: [
        [
          { trait_type: 'element', value: 'air' },
          ...polkadotTokyoParty2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'earth' },
          ...polkadotTokyoParty2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'water' },
          ...polkadotTokyoParty2024Attributes,
        ],
      ],
    },
    network: 'opal',
    tokenStandard: 'unique2',
  },
  'dev-polkadot-tokyo-party-2024': {
    name: 'dev-polkadot-tokyo-party-2024',
    externalId: '3030',
    metadata: {
      description:
        "You've just unlocked the next chapter in your DOTphin journey with this exclusive Proof of Presence (PoP) from Polkadot WebX side event in Tokyo. Each interaction with the community not only enhances your DOTphin but also contributes to AI-driven research decoding whale songs in the Caribbean. This trailblazing project merges the playful evolution of your DOTphin with a meaningful mission to support marine conservation. Get ready to make a positive impact on our oceans—your presence here isn't just a step forward for you; it's a leap towards a more connected, nature-positive future.",
      image: [
        'https://real.myfilebase.com/ipfs/QmcikNxZxXdfoPJppUMeNkoseUUn6HVKN79kTFMEBmh6dD/polkadot-tokyo-party-2024-air.png',
        'https://real.myfilebase.com/ipfs/QmcikNxZxXdfoPJppUMeNkoseUUn6HVKN79kTFMEBmh6dD/polkadot-tokyo-party-2024-earth.png',
        'https://real.myfilebase.com/ipfs/QmcikNxZxXdfoPJppUMeNkoseUUn6HVKN79kTFMEBmh6dD/polkadot-tokyo-party-2024-water.png',
      ],
      name: 'DOTphin Proof of Presence ‒『POLKADOT』Tokyo Party',
      attributes: [
        [
          { trait_type: 'element', value: 'air' },
          ...polkadotTokyoParty2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'earth' },
          ...polkadotTokyoParty2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'water' },
          ...polkadotTokyoParty2024Attributes,
        ],
      ],
    },
    network: 'opal',
    tokenStandard: 'unique2',
  },
  'polkadot-tokyo-party-2024': {
    name: 'polkadot-tokyo-party-2024',
    externalId: '665',
    metadata: {
      description:
        "You've just unlocked the next chapter in your DOTphin journey with this exclusive Proof of Presence (PoP) from Polkadot WebX side event in Tokyo. Each interaction with the community not only enhances your DOTphin but also contributes to AI-driven research decoding whale songs in the Caribbean. This trailblazing project merges the playful evolution of your DOTphin with a meaningful mission to support marine conservation. Get ready to make a positive impact on our oceans—your presence here isn't just a step forward for you; it's a leap towards a more connected, nature-positive future.",
      image: [
        'https://real.myfilebase.com/ipfs/QmcikNxZxXdfoPJppUMeNkoseUUn6HVKN79kTFMEBmh6dD/polkadot-tokyo-party-2024-air.png',
        'https://real.myfilebase.com/ipfs/QmcikNxZxXdfoPJppUMeNkoseUUn6HVKN79kTFMEBmh6dD/polkadot-tokyo-party-2024-earth.png',
        'https://real.myfilebase.com/ipfs/QmcikNxZxXdfoPJppUMeNkoseUUn6HVKN79kTFMEBmh6dD/polkadot-tokyo-party-2024-water.png',
      ],
      name: 'DOTphin Proof of Presence ‒『POLKADOT』Tokyo Party',
      attributes: [
        [
          { trait_type: 'element', value: 'air' },
          ...polkadotTokyoParty2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'earth' },
          ...polkadotTokyoParty2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'water' },
          ...polkadotTokyoParty2024Attributes,
        ],
      ],
    },
    network: 'unique',
    tokenStandard: 'unique2',
  },
  //DECODED ASIA
  'dev-decoded-asia-2024': {
    name: 'dev-decoded-asia-2024',
    externalId: '3030',
    metadata: {
      description:
        'An exciting new PoP has surfaced! This unique Proof of Presence for Decoded Asia 2024 in Singapore is a token of your continuous involvement with the Polkadot community. More than just a keepsake, this badge unlocks a multi-event adventure dedicated to supporting real-world whale conservation initiatives. Your eco-evolving avatar awaits. Take the plunge and immerse yourself in nature.',
      image: [
        'https://real.myfilebase.com/ipfs/QmQ8eTPtXjHvqrTRie2uEaBgmHZwjsukX7zSz5rFSDfB9T/decoded-asia-2024-air.png',
        'https://real.myfilebase.com/ipfs/QmQ8eTPtXjHvqrTRie2uEaBgmHZwjsukX7zSz5rFSDfB9T/decoded-asia-2024-earth.png',
        'https://real.myfilebase.com/ipfs/QmQ8eTPtXjHvqrTRie2uEaBgmHZwjsukX7zSz5rFSDfB9T/decoded-asia-2024-water.png',
      ],
      name: 'DOTphin Proof of Presence ‒ Decoded Asia 2024',
      attributes: [
        [{ trait_type: 'element', value: 'air' }, ...decodedAsia2024Attributes],
        [
          { trait_type: 'element', value: 'earth' },
          ...decodedAsia2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'water' },
          ...decodedAsia2024Attributes,
        ],
      ],
    },
    network: 'opal',
    tokenStandard: 'unique2',
  },
  'testnet-decoded-asia-2024': {
    name: 'testnet-decoded-asia-2024',
    externalId: '3551',
    metadata: {
      description:
        'An exciting new PoP has surfaced! This unique Proof of Presence for Decoded Asia 2024 in Singapore is a token of your continuous involvement with the Polkadot community. More than just a keepsake, this badge unlocks a multi-event adventure dedicated to supporting real-world whale conservation initiatives. Your eco-evolving avatar awaits. Take the plunge and immerse yourself in nature.',
      image: [
        'https://real.myfilebase.com/ipfs/QmQ8eTPtXjHvqrTRie2uEaBgmHZwjsukX7zSz5rFSDfB9T/decoded-asia-2024-air.png',
        'https://real.myfilebase.com/ipfs/QmQ8eTPtXjHvqrTRie2uEaBgmHZwjsukX7zSz5rFSDfB9T/decoded-asia-2024-earth.png',
        'https://real.myfilebase.com/ipfs/QmQ8eTPtXjHvqrTRie2uEaBgmHZwjsukX7zSz5rFSDfB9T/decoded-asia-2024-water.png',
      ],
      name: 'DOTphin Proof of Presence ‒ Decoded Asia 2024',
      attributes: [
        [{ trait_type: 'element', value: 'air' }, ...decodedAsia2024Attributes],
        [
          { trait_type: 'element', value: 'earth' },
          ...decodedAsia2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'water' },
          ...decodedAsia2024Attributes,
        ],
      ],
    },
    network: 'opal',
    tokenStandard: 'unique2',
  },
  'decoded-asia-2024': {
    name: 'decoded-asia-2024',
    externalId: '665',
    metadata: {
      description:
        'An exciting new PoP has surfaced! This unique Proof of Presence for Decoded Asia 2024 in Singapore is a token of your continuous involvement with the Polkadot community. More than just a keepsake, this badge unlocks a multi-event adventure dedicated to supporting real-world whale conservation initiatives. Your eco-evolving avatar awaits. Take the plunge and immerse yourself in nature.',
      image: [
        'https://real.myfilebase.com/ipfs/QmQ8eTPtXjHvqrTRie2uEaBgmHZwjsukX7zSz5rFSDfB9T/decoded-asia-2024-air.png',
        'https://real.myfilebase.com/ipfs/QmQ8eTPtXjHvqrTRie2uEaBgmHZwjsukX7zSz5rFSDfB9T/decoded-asia-2024-earth.png',
        'https://real.myfilebase.com/ipfs/QmQ8eTPtXjHvqrTRie2uEaBgmHZwjsukX7zSz5rFSDfB9T/decoded-asia-2024-water.png',
      ],
      name: 'DOTphin Proof of Presence ‒ Decoded Asia 2024',
      attributes: [
        [{ trait_type: 'element', value: 'air' }, ...decodedAsia2024Attributes],
        [
          { trait_type: 'element', value: 'earth' },
          ...decodedAsia2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'water' },
          ...decodedAsia2024Attributes,
        ],
      ],
    },
    network: 'unique',
    tokenStandard: 'unique2',
  },
  //POLKADOT DECODED 2024
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
  //EDCON 2024
  edcon2024: {
    name: 'edcon2024',
    externalId: '665',
    metadata: {
      description:
        "This is the DOTphin Proof of Attendance for EDCON 2024 in Tokyo.\nThe DOTphin adventure continues. This badge is more than just a collectible; it's the key to a multi-chain and multi-event journey that supports real-world biodiversity conservation. It's an opportunity to connect communities and promote interoperability while supporting marine conservation efforts. This Proof of Attendance extends a greeting from Polkadot to the ETH community, as all Proofs and DOTphin NFTs are supported by EVM and Substrate. Join us in shaping a regenerative future through active community involvement and real-world conservation action.",
      image: [
        'https://real.myfilebase.com/ipfs/QmcChQevauNAkydapjU2xhcnCQhReiqzSRigd7U8nKHTvw/edcon2024-air.png',
        'https://real.myfilebase.com/ipfs/QmcChQevauNAkydapjU2xhcnCQhReiqzSRigd7U8nKHTvw/edcon2024-earth.png',
        'https://real.myfilebase.com/ipfs/QmcChQevauNAkydapjU2xhcnCQhReiqzSRigd7U8nKHTvw/edcon2024-water.png',
      ],
      name: 'DOTphin Proof of Attendance ‒ EDCON 2024',
      attributes: [
        [{ trait_type: 'element', value: 'air' }, ...edcon2024Attributes],
        [{ trait_type: 'element', value: 'earth' }, ...edcon2024Attributes],
        [{ trait_type: 'element', value: 'water' }, ...edcon2024Attributes],
      ],
    },
    network: 'unique',
    tokenStandard: 'unique2',
  },
  //WEB3 SUMMIT 2024
  web3summit2024: {
    name: 'web3summit2024',
    externalId: '665',
    metadata: {
      description:
        "You've just unlocked the next chapter in your DOTphin journey with this exclusive Proof of Presence (PoP) from Web3 Summit 2024 in Berlin. As you mark your presence at this summit, dedicated to advancing a fully functional and user-friendly decentralised web, your DOTphin evolves alongside you. Each interaction with the community not only enhances your DOTphin but also contributes to AI-driven research decoding whale songs in the Caribbean. This trailblazing project merges the playful evolution of your DOTphin with a meaningful mission to support marine conservation. Get ready to make a positive impact on our oceans—your presence here isn't just a step forward for you; it's a leap towards a more connected, nature-positive future.",
      image: [
        'https://real.myfilebase.com/ipfs/QmaCeoQ5yCHBphJ2oX5uTkFKL9GmQbEfarUckwaLMLtt82/web3summit2024-air.png',
        'https://real.myfilebase.com/ipfs/QmaCeoQ5yCHBphJ2oX5uTkFKL9GmQbEfarUckwaLMLtt82/web3summit2024-earth.png',
        'https://real.myfilebase.com/ipfs/QmaCeoQ5yCHBphJ2oX5uTkFKL9GmQbEfarUckwaLMLtt82/web3summit2024-water.png',
      ],
      name: 'DOTphin Proof of Presence ‒ Web3Summit 2024',
      attributes: [
        [{ trait_type: 'element', value: 'air' }, ...web3summit2024Attributes],
        [
          { trait_type: 'element', value: 'earth' },
          ...web3summit2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'water' },
          ...web3summit2024Attributes,
        ],
      ],
    },
    network: 'unique',
    tokenStandard: 'unique2',
  },
  //TOKEN2049 Singapore 2024
  'dev-token2049-singapore-2024': {
    name: 'dev-token2049-singapore-2024',
    externalId: '3030',
    metadata: {
      description:
        "From the deep oceans, another beautiful PoP has emerged. Bridging all ecosystems, this Proof of Presence confirms your participation at one of the largest blockchain events in the world, Token2049 / Singapore. This badge is the key to listening to real-world whale songs and supporting their conservation efforts. Are you ready to evolve with their songs? Don't forget to collect your eco-evolving DOTphin avatar right away.",
      image: [
        'https://real.myfilebase.com/ipfs/QmQEGjX4DiNyaTDUC7AxzizxF2G5U4DhDEHwYzMH27UGwu/token2049-singapore-2024-air.png',
        'https://real.myfilebase.com/ipfs/QmQEGjX4DiNyaTDUC7AxzizxF2G5U4DhDEHwYzMH27UGwu/token2049-singapore-2024-earth.png',
        'https://real.myfilebase.com/ipfs/QmQEGjX4DiNyaTDUC7AxzizxF2G5U4DhDEHwYzMH27UGwu/token2049-singapore-2024-water.png',
      ],
      name: 'DOTphin Proof of Presence ‒ Token2049 Singapore 2024',
      attributes: [
        [
          { trait_type: 'element', value: 'air' },
          ...token2049Singapore2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'earth' },
          ...token2049Singapore2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'water' },
          ...token2049Singapore2024Attributes,
        ],
      ],
    },
    network: 'opal',
    tokenStandard: 'unique2',
  },
  'testnet-token2049-singapore-2024': {
    name: 'testnet-token2049-singapore-2024',
    externalId: '3551',
    metadata: {
      description:
        "From the deep oceans, another beautiful PoP has emerged. Bridging all ecosystems, this Proof of Presence confirms your participation at one of the largest blockchain events in the world, Token2049 / Singapore. This badge is the key to listening to real-world whale songs and supporting their conservation efforts. Are you ready to evolve with their songs? Don't forget to collect your eco-evolving DOTphin avatar right away.",
      image: [
        'https://real.myfilebase.com/ipfs/QmQEGjX4DiNyaTDUC7AxzizxF2G5U4DhDEHwYzMH27UGwu/token2049-singapore-2024-air.png',
        'https://real.myfilebase.com/ipfs/QmQEGjX4DiNyaTDUC7AxzizxF2G5U4DhDEHwYzMH27UGwu/token2049-singapore-2024-earth.png',
        'https://real.myfilebase.com/ipfs/QmQEGjX4DiNyaTDUC7AxzizxF2G5U4DhDEHwYzMH27UGwu/token2049-singapore-2024-water.png',
      ],
      name: 'DOTphin Proof of Presence ‒ Token2049 Singapore 2024',
      attributes: [
        [
          { trait_type: 'element', value: 'air' },
          ...token2049Singapore2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'earth' },
          ...token2049Singapore2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'water' },
          ...token2049Singapore2024Attributes,
        ],
      ],
    },
    network: 'opal',
    tokenStandard: 'unique2',
  },
  'token2049-singapore-2024': {
    name: 'token2049-singapore-2024',
    externalId: '665',
    metadata: {
      description:
        "From the deep oceans, another beautiful PoP has emerged. Bridging all ecosystems, this Proof of Presence confirms your participation at one of the largest blockchain events in the world, Token2049 / Singapore. This badge is the key to listening to real-world whale songs and supporting their conservation efforts. Are you ready to evolve with their songs? Don't forget to collect your eco-evolving DOTphin avatar right away.",
      image: [
        'https://real.myfilebase.com/ipfs/QmQEGjX4DiNyaTDUC7AxzizxF2G5U4DhDEHwYzMH27UGwu/token2049-singapore-2024-air.png',
        'https://real.myfilebase.com/ipfs/QmQEGjX4DiNyaTDUC7AxzizxF2G5U4DhDEHwYzMH27UGwu/token2049-singapore-2024-earth.png',
        'https://real.myfilebase.com/ipfs/QmQEGjX4DiNyaTDUC7AxzizxF2G5U4DhDEHwYzMH27UGwu/token2049-singapore-2024-water.png',
      ],
      name: 'DOTphin Proof of Presence ‒ Token2049 Singapore 2024',
      attributes: [
        [
          { trait_type: 'element', value: 'air' },
          ...token2049Singapore2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'earth' },
          ...token2049Singapore2024Attributes,
        ],
        [
          { trait_type: 'element', value: 'water' },
          ...token2049Singapore2024Attributes,
        ],
      ],
    },
    network: 'unique',
    tokenStandard: 'unique2',
  },
};
