import { Sr25519Account } from '@unique-nft/utils/sr25519';
import Sdk from '@unique-nft/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const NETWORK: 'opal' | 'unique' = 'opal';

// man picture (medium size png)
const IMAGE_URL =
  'https://real.myfilebase.com/ipfs/QmVQgYDk7655Tu2nKtbky4pcJV34Kg4NDrVW48jYJZTasC';

const getLinkToCollection = (sdk: Sdk, collectionId: number) => {
  return `${sdk.options.baseUrl}/collections/v2?collectionId=${collectionId}`;
};

const createCollection = async (sdk: Sdk): Promise<number> => {
  const collectionCreationResult = await sdk.collection.createV2({
    name: 'DOTphin',
    description: 'Your DOTphin avatar',
    symbol: 'DOTPHIN',
    cover_image: { url: IMAGE_URL },
    potential_attributes: [
      { trait_type: 'level' },
      { trait_type: 'experience' },
      { trait_type: 'proofs' },
      { trait_type: 'name' },
    ],
  });

  if (!collectionCreationResult.parsed) {
    throw collectionCreationResult.error;
  }
  const collectionId = collectionCreationResult.parsed.collectionId;

  console.log(
    `Collection created, id ${collectionId}. ${getLinkToCollection(
      sdk,
      collectionId
    )}`
  );

  return collectionId;
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

  const collectionId = await createCollection(sdk);
  console.log('Collection created:', collectionId);
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
