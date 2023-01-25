import { gql } from 'apollo-angular';

export const SOULS_LIST = gql`
  query sniList {
    snis {
      id
      owner
      status
      createdAt
      updatedAt
      name
      collectionName
    }
  }
`;

export const SOUL_DETAIL = gql`
  query sniDetail($sniId: ID!) {
    sni(id: $sniId) {
      id
      status
      name
      createdAt
      updatedAt
      owner
      collectionName
    }
  }
`;

export const SOUL_PROPERTY = gql`
  query sniDetail($sniId: ID!) {
    sni(id: $sniId) {
      oracle
      symbol
      description
      image
      statusDescription
      taxonId
      tokenId
      tokenURI
      geometry
      conservationStatus
      computeURI
      dataURI
    }
  }
`;
