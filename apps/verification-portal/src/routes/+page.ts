export const load = async (event) => {
  let collection = event.url.searchParams.get('q');

  if (!collection) collection = 'soundwaves';

  const highlightsResponse = await fetch(
    `https://web3-highlights.sovereign.workers.dev/${collection}`
  );

  const highlights = await highlightsResponse.json();

  console.log(highlights);

  return { highlights };
};

// const response = fetch(
//   `https://web3-highlights.sovereign.workers.dev/${collection}`
// ).then((res) => await res.json());
