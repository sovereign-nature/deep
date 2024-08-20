export const getNFT = `
  query getLionNFT($contractAddress: String!, $tokenId: BigInt!) {
    tokens(
      where: { address_contains: $contractAddress, numericId_eq: $tokenId }
    ) {
      id
      numericId
      address
      metadata{
        name
        description
        image
      }
    }
  }
`;
