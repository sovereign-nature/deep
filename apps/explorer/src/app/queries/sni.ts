import { gql } from 'apollo-angular';

export const SOULS_LIST = gql`
  query sniList(
    $offset: ID
    $status: BigInt
    $createdAt: BigInt
    $updatedAt: BigInt
    $tokenId: BigInt
  ) {
    snis(
      first: 15
      orderBy: tokenId
      where: {
        id_gt: $offset
        status: $status
        createdAt_gte: $createdAt
        updatedAt_gte: $updatedAt
        tokenId: $tokenId
      }
    ) {
      id
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
