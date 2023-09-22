# SNI Verification Portal

## Address Validation Flow

1. Each asset address follows Asset DID specification. To get the DEEP LINK token id, we need to hash the address using `@sni/address-utils/stringToId` method. This method converts the token address to unique id. For address like `did:asset:deep:polkadot.asset-hub:u-8:262` we will get the id `31537534386950388023491254677150515860389712061535283602024150019331823461691`.
2. To validated that the token exists, we need to try getting the token ID from indexing API - https://directus.sovereignnature.com/items/links/31537534386950388023491254677150515860389712061535283602024150019331823461691.
3. To get the metadata associated with the token address, we need to parse Asset DID with the helper method - `@sni/address-utils/parseAddress`. After we know on which blockchain the token is stored, we can pull it's information. For example, you can pull information from Polkadot Asset Hub - `https://squid.subsquid.io/speck/v/v3/graphql` with query:
```gql
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
        }
      }
    }
```

4. To pull the information about the linked animal, you can use SNI Data API - `https://directus.sovereignnature.com/items/aimm_minke_whales/ba_alg_001?fields=*,images.*,steward.*.*`
