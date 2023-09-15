import { parseAddress } from '@sni/address-utils';
import { gql, request } from 'graphql-request';

const POLKADOT_NFT_API = 'https://squid.subsquid.io/speck/v/v3/graphql';
//const KUSAMA_NFT_API = 'https://squid.subsquid.io/stick/graphql';

export async function load(event) {
  const assetAddress = event.params.assetAddress;

  const { asset } = parseAddress(assetAddress);

  // did:asset:deep:polkadot.asset-hub:u-8:262

  const document = gql`
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
  `;

  const nftData = await request(POLKADOT_NFT_API, document, {
    id: `${asset.reference}-${asset.identifier}`,
  });

  console.log(nftData);

  // type TestData = {
  //   id: string;
  //   createdAt: string;
  //   updatedAt: string;
  //   name: string;
  //   description: string;
  //   image: string;
  //   link: string;
  //   tags: string[];
  // };

  // const res = await fetch(
  //   `https://directus.sovereignnature.com/items/aimm_dolphins/${slug}`
  // );
  // const { data }: { data: TestData } = await res.json();

  // return { slug, data };

  return { assetAddress };
}
