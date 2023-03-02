import { gql } from 'apollo-angular';

export const SOULS_LIST = gql`
  query sniList($offset: ID) {
    snis(first: 15, where: { id_gt: $offset }) {
      id
      owner
      status
      createdAt
      updatedAt
      metadata {
        name
      }
    }
  }
`;

export const SOUL_DETAIL = gql`
  query sniDetail($sniId: ID!) {
    sni(id: $sniId) {
      id
      status
      metadata {
        name
      }
      createdAt
      updatedAt
      collectionName
    }
  }
`;

export const SOUL_PROPERTY = gql`
  query sniDetail($sniId: ID!) {
    sni(id: $sniId) {
      tokenId
      computeURI
      dataURI
      metadata {
        description
        image
        attributes {
          trait_type
          value
        }
        properties {
          taxonId
          statusDescription
          geometry
          conservationStatus
        }
      }
    }
  }
`;
