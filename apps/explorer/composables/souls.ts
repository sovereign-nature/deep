// TODO: Make state management work with gql query
export const useSouls = async () => {
  useGqlCors({ credentials: 'same-origin' })
  const { data } = await useAsyncGql('sniList', { sniId: '1' })
  return useState('souls', () => data)
}
