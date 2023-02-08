import { METADATA_HASH_FUNCTION } from '@sni/constants';
import {
  DERIVATIVE_METADATA_SCHEMA,
  DERIVATIVE_METADATA_SCHEMA_DIGEST,
  INITIAL_COMPUTE_URI,
  INITIAL_DATA_URI,
  INITIAL_STATUS,
  INITIAL_TOKEN_ID,
  INITIAL_TOKEN_URI,
  INITIAL_TOKEN_URI_DIGEST,
  TOKEN_URI_SCHEMA,
  TOKEN_URI_SCHEMA_DIGEST,
  UPDATED_COMPUTE_URI,
  UPDATED_DATA_URI,
  UPDATED_STATUS,
  UPDATED_TOKEN_URI,
  UPDATED_TOKEN_URI_DIGEST,
} from '@sni/constants/mocks/identifier';
import { ethers } from 'hardhat';

export async function deploySNIFixture() {
  // Contracts are deployed using the first signer/account by default
  const [owner, oracle, otherAccount] = await ethers.getSigners();

  const SovereignNatureIdentifier = await ethers.getContractFactory(
    'SovereignNatureIdentifier'
  );
  const sni = await SovereignNatureIdentifier.deploy(
    TOKEN_URI_SCHEMA,
    TOKEN_URI_SCHEMA_DIGEST,
    DERIVATIVE_METADATA_SCHEMA,
    DERIVATIVE_METADATA_SCHEMA_DIGEST
  );

  const mintInitial = () => {
    return sni.safeMint(
      owner.address,
      INITIAL_TOKEN_URI,
      INITIAL_TOKEN_URI_DIGEST,
      INITIAL_DATA_URI,
      INITIAL_COMPUTE_URI,
      INITIAL_STATUS
    );
  };

  return {
    sni,
    initialTokenId: INITIAL_TOKEN_ID,
    initialTokenURI: INITIAL_TOKEN_URI,
    updatedTokenURI: UPDATED_TOKEN_URI,
    initialComputeURI: INITIAL_COMPUTE_URI,
    updatedComputeURI: UPDATED_COMPUTE_URI,
    initialDataURI: INITIAL_DATA_URI,
    updatedDataURI: UPDATED_DATA_URI,
    initialStatus: INITIAL_STATUS,
    updatedStatus: UPDATED_STATUS,
    owner,
    oracle,
    otherAccount,
    mintInitial,
    initialTokenURIDigest: INITIAL_TOKEN_URI_DIGEST,
    updatedTokenURIDigest: UPDATED_TOKEN_URI_DIGEST,
    tokenURISchema: TOKEN_URI_SCHEMA,
    hashAlgorithm: METADATA_HASH_FUNCTION,
    tokenURISchemaDigest: TOKEN_URI_SCHEMA_DIGEST,
    derivativeMetadataSchemaURI: DERIVATIVE_METADATA_SCHEMA,
    derivativeMetadataSchemaDigest: DERIVATIVE_METADATA_SCHEMA_DIGEST,
  };
}
