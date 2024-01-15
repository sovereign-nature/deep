export const load = async ({ fetch, url }) => {
  let collection = url.searchParams.get('q');

  if (!collection) collection = 'soundwaves';

  const highlightsResponse = await fetch(
    `https://web3-highlights.sovereign.workers.dev/${collection}`
  );

  let highlights = [];

  if (highlightsResponse.ok) {
    highlights = await highlightsResponse.json();
  }

  console.log('Server highlights: ', highlights);

  return { highlights };
};

// const response = fetch(
//   `https://web3-highlights.sovereign.workers.dev/${collection}`
// ).then((res) => await res.json());
