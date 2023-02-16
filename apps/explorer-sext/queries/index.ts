export const getLions = gql`
  {
    snis(orderBy: createdAt) {
      name
      image
      description
      tokenId
    }
  }
`;

export const getLion = gql`
  query getLion($id: ID!) {
    sni(id: $id) {
      tokenURI
      computeURI
      name
      description
      image
      status
    }
  }
`;
