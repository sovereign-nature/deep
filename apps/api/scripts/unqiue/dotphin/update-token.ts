import { Sr25519Account } from '@unique-nft/utils/sr25519';
import Sdk, { TokenWithInfoV2Dto } from '@unique-nft/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const NETWORK: 'opal' | 'unique' = 'opal';

// man picture (medium size png)
const IMAGE_URL =
  'https://real.myfilebase.com/ipfs/QmXzECuBhrG2xy6ewRJCivZFiTYeuvoAosTjRADhuHaoUA';

const COLLECTION_ID = 3773;

const getLinkToToken = (sdk: Sdk, collectionId: number, tokenId: number) => {
  return `${sdk.options.baseUrl}/tokens/v2?collectionId=${collectionId}&tokenId=${tokenId}`;
};

export const changeAttribute = (
  token: TokenWithInfoV2Dto,
  attributeToChange: string,
  newValue: string
) => {
  const tokenDataProp = token.properties.find((p) => p.key === 'tokenData');
  if (!tokenDataProp) throw Error('Cannot parse tokenData property');
  const tokenDataValue = JSON.parse(tokenDataProp.value);

  if (!tokenDataValue.attributes) throw Error('Cannot parse attributes');

  const targetAttributeIndex = tokenDataValue.attributes.findIndex(
    (a: { trait_type: string; value: string }) =>
      a.trait_type === attributeToChange
  );

  if (targetAttributeIndex === -1)
    throw Error('Cannot parse attribute to change');

  tokenDataValue.attributes[targetAttributeIndex] = {
    trait_type: attributeToChange,
    value: newValue,
  };

  return JSON.stringify(tokenDataValue);
};

const updateToken = async (sdk: Sdk, collectionId: number, tokenId: number) => {
  const token = await sdk.token.getV2({ collectionId, tokenId });

  console.log('Token:', token);

  const tokenDataProp = token.properties.find((p) => p.key === 'tokenData');
  if (!tokenDataProp) throw Error('Cannot find tokenData property');

  console.log('TokenData:', tokenDataProp);

  const tokenDataValue = JSON.parse(tokenDataProp.value);

  console.log('Image:', tokenDataValue.image);

  tokenDataValue.image = IMAGE_URL;

  console.log('New Image:', tokenDataValue.image);

  tokenDataValue.description = 'UPDATED';

  const result = await sdk.token.setProperties({
    collectionId,
    tokenId,
    properties: [{ key: 'tokenData', value: JSON.stringify(tokenDataValue) }],
  });

  console.log(
    `Tokens updated in collection ${collectionId} with ID ${tokenId}}`
  );

  if (result.error) {
    console.error('Errors:', result.error);
  }

  console.log(`${getLinkToToken(sdk, collectionId, tokenId)}`);

  return tokenId;
};

const main = async () => {
  // init substrate account and sdk
  const mnemonic = process.env.WALLET_MNEMONIC;
  if (!mnemonic) throw new Error('SUBSTRATE_MNEMONIC env variable is not set');
  const account = Sr25519Account.fromUri(mnemonic);

  console.log('Account address:', account.address);

  const sdk = new Sdk({
    baseUrl: `https://rest.unique.network/${NETWORK}/v1`,
    account,
    waitBetweenStatusRequestsInMs: 5000,
  });

  const tokenIds = await updateToken(sdk, COLLECTION_ID, 5);

  console.log('Tokens minted:', tokenIds);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    if (typeof error === 'object' && error !== null) {
      if (error.isAxiosError === true) {
        const url =
          error.response?.request?.res?.responseUrl || error.config?.url;
        console.log({ ...error.response?.data, url });
        if (error.details) {
          console.dir(error.details, { depth: 100 });
        }
      } else {
        if (error.details) {
          console.log(error.toString());
          console.dir(error.details, { depth: 100 });
        } else {
          console.error(error);
        }
      }
    } else {
      console.error(error);
    }
    process.exit(1);
  });
