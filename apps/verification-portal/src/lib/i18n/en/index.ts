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
} satisfies BaseTranslation;

export default en;
