import type { BaseTranslation } from '../i18n-types';

const en: BaseTranslation = {
  title: {
    part1: 'Welcome to our',
    part2: 'REAL',
    part3: 'Verification Portal.',
  },
  subtitle:
    'Learn how your asset is helping real-world conservation efforts around the globe.',
  collection: 'Collection:',
  highlights: 'Latest Highlights',
  results: {
    resultsFor: 'Showing results for',
    nrResults: '{0} result{{s}}',
    noResults: 'No results found',
    errorMessage:
      'Uh-oh! It looks like a hiccup in the wild! 🐾 \n Please lend a paw by refreshing the page and trying again.',
  },
  web2: {
    search: {
      label: 'Search for your asset',
      placeholder: 'Asset name',
    },
  },
  assets: {
    title: 'REAL by SNI | {assetName: string}',
    intro: {
      sub0: 'Welcome to the Polkadot sub0 biodiversity collection. Your contribution makes a REAL difference. Connect with the marine biodiversity served by the organisation AIMM Portugal.',
    },
    verified: 'Verified:',
    shareText: 'Share your asset',
    funds: {
      cardTitle: 'Funds generated so far:',
      labelAsset: 'By this asset',
      labelTotal: 'Total',
    },
    ecSteward: {
      title: 'Ecological Steward',
      description:
        'Ecological Steward (ES): an identified conservation/restoration group, being an organisation (e.g. KWT) or a community, group of stakeholders who has also the mandate to manage the funds raised',
    },
    ecEntity: {
      cardTitle: 'Collecting funds for:',
      propsTitle: 'Animal stats:',
      title: 'Ecological Entity',
      description:
        'Ecological Entity: an identified piece of ecology the Ecological Steward (ES) focuses on, that being a specific species population (predators of the Maasai Mara) or an ecosystem (the Upemba National Park)',
      traces: 'Traces Recorded',
    },
  },
  social: {
    shareCard: {
      title: 'REAL by Sovereign Nature Initiative',
      description:
        'The eco-data pipeline to connect real life ecology with the digital world.',
    },
    og: {
      token: 'Token ID:',
      source: 'Source:',
      fundsGenerated: 'Total funds generated to date:',
    },
    sub0: {
      twitterPrefix:
        '#NFTs supporting verified #BiodiversityConservation?! Count me in! 🐬\n\nThanks @sovereignnature for bringing REAL data of bottlenose dolphins & minke whales monitored by @AIMMPortugal onchain. Glad my @Polkadot #sub0 attendance supports this wild cause! 🐋',
      telegramPrefix:
        'NFTs supporting verified biodiversity conservation?! Count me in! 🐬 \n \nThanks Sovereign Nature Initiative for bringing REAL data of bottlenose dolphins and minke whales monitored by AIMM Portugal onchain. Glad my Polkadot sub0 attendance supports this wild cause! 🐋',
    },
    hh: {
      twitterPrefix:
        'Just discovered the Upemba National Park room in #HotelHideaway, and it is WILD! 🐘🦓\n\nFor example, this item I purchased directly supports @forgottenparksF’s #BiodiversityConservation efforts thanks to @sovereignnature. Check out the details below!',
      telegramPrefix:
        'Just discovered the Upemba National Park room in Hotel Hideaway, and it is WILD! 🐘🦓\n\nFor example, this item I purchased directly supports @forgottenparksF’s biodiversity conservation efforts thanks to the Sovereign Nature Initiative. Check out the details below!',
    },
  },
  footer: {
    mailing: 'Subscribe to our mailing list',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
  },
  colorTheme: {
    auto: 'Auto',
    light: 'Light',
    dark: 'Dark',
  },
  errors: {
    image:
      "Oops! The asset image couldn't make it to the habitat.🐾 \n Please try again later.",
    notFoundTitle: 'Try searching for another asset...',
    errorPageTitle: 'Search for your asset to verify',
  },
} satisfies BaseTranslation;

export default en;
