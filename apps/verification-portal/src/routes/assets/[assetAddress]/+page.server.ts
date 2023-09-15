import { parseAddress } from '@sni/address-utils';
export async function load(event) {
  const assetAddress = event.params.assetAddress;

  const data = parseAddress(assetAddress);

  console.log(data);

  // did:asset:deep:polkadot.asset-hub:u-8:262

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
