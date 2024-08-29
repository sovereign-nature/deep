import { Sr25519Account } from '@unique-nft/utils/sr25519';
import Sdk from '@unique-nft/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const NETWORK: 'opal' | 'unique' = 'opal';

// man picture (medium size png)
const IMAGE_URL =
  'https://real.myfilebase.com/ipfs/QmVQgYDk7655Tu2nKtbky4pcJV34Kg4NDrVW48jYJZTasC';

const COLLECTION_ID = 3019;

const getLinkToToken = (sdk: Sdk, collectionId: number, tokenId: number) => {
  return `${sdk.options.baseUrl}/tokens/v2?collectionId=${collectionId}&tokenId=${tokenId}`;
};

const mintTokens = async (sdk: Sdk, collectionId: number) => {
  const tokensMintingResult = await sdk.token.createMultipleV2({
    collectionId,
    tokens: [
      {
        owner: '0xB8A976Ad1d87D070b5E5806B98A768B4BB4E4847',
        name: 'demo token',
        image: IMAGE_URL,
        attributes: [{ trait_type: 'color', value: 'YElLLow' }],
      },
    ],
  });
  if (!tokensMintingResult.parsed) {
    throw tokensMintingResult.error;
  }
  const tokenIds = tokensMintingResult.parsed.map(({ tokenId }) => tokenId);

  console.log(
    `Tokens minted in collection ${collectionId}, ids ${tokenIds.join(', ')}`
  );
  for (const tokenId of tokenIds) {
    console.log(`${getLinkToToken(sdk, collectionId, tokenId)}`);
  }

  return tokenIds;
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

  const tokenIds = await mintTokens(sdk, COLLECTION_ID);

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
