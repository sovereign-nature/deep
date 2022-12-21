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

export const SNI_DETAIL = gql`
  query sniDetail($sniId: ID!) {
    sni(id: $sniId) {
      id
      status
      name
      createdAt
      updatedAt
      owner
      oracle
      collectionName
      symbol
      name
      description
      image
      statusDescription
      taxonId
      tokenId
      tokenURI
      geometry
      conservationStatus
    }
  }
`;
