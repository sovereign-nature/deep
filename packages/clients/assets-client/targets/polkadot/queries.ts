import { gql } from 'graphql-request';

export const getNftById = gql`
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
