import type { BaseTranslation } from '../i18n-types';

const en: BaseTranslation = {
  title: {
    part1: 'Welcome to our',
    part2: 'REAL',
    part3: 'Portal.',
  },
  subtitle:
    'Learn how your asset is helping real-world conservation efforts around the globe.',
  collection: 'Collection:',
  collectionMobile: 'Choose your collection:',
  highlights: 'Explore collection highlights:',
  highlightsFor: 'Explore {collectionName: string} highlights:',
  selectToken: 'Select this token',
  searchForTokens: 'Search for tokens',
  results: {
    resultsFor: 'Showing results for',
    nrResults: '{0} result{{s}}',
    noResults: 'No results found',
    errorMessage:
      'Uh-oh! It looks like a hiccup in the wild! 🐾 \n Please lend a paw by refreshing the page and trying again.',
    refreshFeed: 'Refresh feed',
    refreshing: 'Refreshing...',
  },
  web2: {
    search: {
      label: 'Search for your asset',
      placeholder: 'Asset name',
    },
  },
  web3: {
    search: {
      placeholder: 'Find by token ID',
    },
  },
  //TODO: Move collection names out of translations
  //collections
  'dotphin-proofs': {
    collectionName: 'DOTphin Proofs',
    searchPlaceholder: '',
  },
  engie: {
    collectionName: 'ENGIE',
    searchPlaceholder: 'Find by token ID (1-300)',
  },
  sub0: {
    collectionName: 'sub0 Biodiversity',
    searchPlaceholder: 'Find by token ID (1-1466)',
  },
  soundwaves: {
    collectionName: 'Soundwaves',
    searchPlaceholder: '',
  },
  hh: {
    collectionName: 'Hotel Hideaway',
    searchPlaceholder: '',
  },
  wildsama: {
    collectionName: 'Wildsama',
    searchPlaceholder: '',
  },
  wallet: {
    assetsFor: 'Showing your ',
    assetsFor_pt2: '{collection: string} assets',
    myAssets:
      'You own {nrOfAssets: number} {collection: string} asset{{nrOfAssets:s}}',
    nrAssets: '{0} asset{{s}} found',
    noAssets: 'No assets found',
    errorMessage:
      'Uh-oh! It looks like a hiccup in the wild! 🐾 \n Please lend a paw by refreshing the page and trying again.',
    inputPlaceholder: 'e.g. 0x1234...',
  },
  claim: {
    useWallet: 'Use Wallet Address',
    useManualInput: 'Enter Wallet Address Manually',
    titleClaim: 'Claim your token',
    titleValid: 'Congratulations on your new token!',
    titlePending: 'Your claim is pending',
    descriptionPending:
      'Your token is being minted, this can take several minutes. In the meantime you can continue exploring the site.',
    titleInvalid: 'Invalid claim',
    invalidMessage:
      'Sorry, the submitted claim token is invalid. Please try the claim link again and if the problem persists reach out to us.',
    checkClaim: ' Check the claim status',
    buttonCTA: '⭐ Claim Your Badge',
    buttonPending: '⏳ Badge Is Pending',
    buttonSuccess: '⭐ Your Token Is Minted!',
    buttonSubmit: 'Submit Claim',
    labelManualAddress: 'Enter a valid wallet address:',
    labelConnectWallet: 'Login or connect your wallet',
    labelWalletAddress: 'Claiming address:',
    labelEmailAddress: 'Email address (Optional)',
    placeholderEmail: 'example@example.com',
    descriptionEmail: '*Get one extra token by linking your email',
    toggleLinkManual: 'Switch to manual input',
    toggleLinkWallet: 'Connect a wallet',
    manualAddressPrompt: 'Trouble connecting? \n Try manual input.',
  },
  notifications: {
    seeAll: 'See all notifications',
    nrNotification: '{0} notification{{s}}',
    subscribe: 'Enable',
    subscribeCollection: 'Enable notifications',
    newNotifications:
      'You have {nrOfNotifications: number} new notification{{nrOfNotifications:s}}',
    notificationCenter: 'Your notification center',
    notificationSettings: 'Notification preferences',
    notFound: 'No notifications found',
    deleted: 'Message Deleted',
    loading: 'loading...',
    loadMore: 'Load more',
    loadingFeed: 'Loading',
    connecting: 'connecting...',
    savePreferences: 'Save preferences',
    markAsRead: 'Mark as read',
    markAllRead: 'Mark all read',
    new: 'New',
    titleNewTab: 'New',
    titleArchiveTab: 'Archive',
  },

  assets: {
    title: 'REAL by SNI | {assetName: string}',
    intro: {
      sub0: 'Welcome to the Polkadot sub0 biodiversity collection. Your contribution makes a REAL difference. Connect with the marine biodiversity served by the organisation AIMM Portugal.',
    },
    ecoLinked: 'Eco-Linked:',
    infoEcoLinked: 'Eco-Linked with real world entity',
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
    multipass: {
      cardTitle: 'Part of multi-pass collection:',
      comingSoon: 'Coming soon:',
      CTA: 'Begin the adventure',
      info: 'Part of a multi-pass collection',
      infoLink: 'About {multipassName: string}',
    },
  },
  multipass: {
    state: {
      proofStep: {
        stepTitle: 'Proofs',

        LOGGED_OUT: {
          subtitle: 'Log-in to see your proofs',
          moreInfo: 'Learn more about Attendance Proofs',
        },
        NO_PROOFS: {
          title: `{collection} Attendance Proofs Required`,
          subtitle: 'You currently have no Attendance Proofs.',
          cta: 'How to get proofs?',
          moreInfo: 'Learn more about Attendance Proofs',
        },
        HAS_AVAILABLE_PROOFS: {
          title: `You have <>{count:number}<> unused DOTphin proof{{count:s}}`,
          subtitle:
            'You have a total of {count} {collection:string} proof{{count:s}}',
          moreInfo: 'See all your proofs',
        },
        NO_AVAILABLE_PROOFS: {
          title: `You have no unused {collection}  proofs`,
        },
      },
      nftStep: {
        stepTitle: 'NFT',
        UNCLAIMED: {
          subtitle: 'Use your proofs to unlock the DOTphin.',
          cta: 'Collect the Orb',
        },
        CLAIMED: {},
      },
      evolveStep: {
        stepTitle: 'Evolve',
        INITIAL: {
          subtitle: 'You need to have an NFT to start evolving',
          cta: 'Evolve',
          moreInfo: 'Read more',
        },
        EVOLVING: {
          subtitle: 'Evolution level {level}/{maxLevel}',
        },
        COMPLETE: {
          title: 'Congratulation, you have completed your DOTphin',
          subtitle: 'Your NFT has reached its maximum evolution level',
        },
      },
    },
  },
  social: {
    shareCard: {
      title: 'REAL by Sovereign Nature Initiative',
      description:
        'The eco-data pipeline to connect real life ecology with the digital world.',
    },
    og: {
      // !NB: to prevent open graph errors in generating image, there is fallback text in OgCard component
      token: 'Token ID:',
      source: 'Source:',
      fundsGenerated: 'Total funds generated to date:',
      fundsGeneratedByDate: 'Total funds generated as of {date: string}:',
    },
    twitterPrefix:
      'Check out my collectible linked to real-world impact by @sovereignnature',
    telegramPrefix:
      'Check out my collectible linked to real-world impact by Sovereign Nature Initiative',
    shareImagePrefix:
      'Check out my collectible linked to real-world impact by Sovereign Nature Initiative',
  },
  socialFollow: {
    title: 'Follow us',
    discord: 'Follow us on Discord',
    telegram: 'Follow us on Telegram',
  },
  footer: {
    mailing: 'Subscribe to our mailing list',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
  },
  news: {
    readMore: 'Read more',
    close: 'Close',
  },
  colorTheme: {
    auto: 'Auto',
    light: 'Light Mode',
    lightSm: 'Light',
    dark: 'Dark Mode',
    darkSm: 'Dark',
    switchTheme: 'Switch Mode ({name: string})',
  },
  errors: {
    image:
      "Oops! The asset image couldn't make it to the habitat.🐾 \n Please try again later.",
    notFoundTitle: 'Try searching for another asset...',
    errorPageTitle: 'Search for your asset to verify',
  },
  carousel: {
    nextItem: 'Next Item',
    previousItem: 'Previous Item',
  },
} satisfies BaseTranslation;

export default en;
