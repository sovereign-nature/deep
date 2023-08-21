import {
  CONSERVATION_ID,
  CONSERVATION_IDS,
  ELEMENT_ID,
  ELEMENT_IDS,
  INITIAL_TOKEN_ID,
  INITIAL_TOKEN_IDS,
} from '@sni/constants/mocks/deep-link';
import { ethers } from 'hardhat';

type Fixture1155Single = typeof deployDeepLink1155SingleFixture;
type Fixture1155Batch = typeof deployDeepLink1155BatchFixture;
export type Fixture1155 = Fixture1155Single | Fixture1155Batch;

export async function deployDeepLinkFixture() {
  // Contracts are deployed using the first signer/account by default
  const [owner] = await ethers.getSigners();

  const DeepLink = await ethers.getContractFactory('DeepLink');
  const deepLink = await DeepLink.deploy();

  const mintInitial = () => {
    return deepLink.safeMint(
      owner.address,
      INITIAL_TOKEN_ID,
      ELEMENT_ID,
      CONSERVATION_ID
    );
  };

  return {
    deepLink,
    mintInitial,
    initialTokenId: INITIAL_TOKEN_ID,
    initialElementId: ELEMENT_ID,
    initialConservationId: CONSERVATION_ID,
    owner,
  };
}

export async function deployDeepLink1155SingleFixture() {
  // Contracts are deployed using the first signer/account by default
  const [owner] = await ethers.getSigners();

  const DeepLink = await ethers.getContractFactory('DeepLink1155');
  const deepLink = await DeepLink.deploy();

  const mintInitial = () => {
    return deepLink.mint(
      owner.address,
      INITIAL_TOKEN_ID,
      1,
      ELEMENT_ID,
      CONSERVATION_ID,
      ethers.encodeBytes32String('')
    );
  };

  return {
    deepLink,
    mintInitial,
    initialTokenId: INITIAL_TOKEN_ID,
    initialElementId: ELEMENT_ID,
    initialConservationId: CONSERVATION_ID,
    owner,
  };
}

export async function deployDeepLink1155BatchFixture() {
  // Contracts are deployed using the first signer/account by default
  const [owner] = await ethers.getSigners();

  const DeepLink = await ethers.getContractFactory('DeepLink1155');
  const deepLink = await DeepLink.deploy();

  const mintInitial = () => {
    return deepLink.mintBatch(
      owner.address,
      INITIAL_TOKEN_IDS,
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ELEMENT_IDS,
      CONSERVATION_IDS,
      ethers.encodeBytes32String('')
    );
  };

  return {
    deepLink,
    mintInitial,
    initialTokenId: INITIAL_TOKEN_ID,
    initialElementId: ELEMENT_ID,
    initialConservationId: CONSERVATION_ID,
    owner,
  };
}
