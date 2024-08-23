export const getNftById = `
  query nftById($id: String!) {
    nftEntity: nftEntityById(id: $id) {
      id
      sn
      collection {
        id
        name
      }
      meta {
        name
        description
        image
        animation_url: animationUrl
      }
    }
  }
`;
