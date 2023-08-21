import {
  CONSERVATION_ID,
  ELEMENT_ID,
  INITIAL_TOKEN_ID,
} from '@sni/constants/mocks/deep-link';
import { ethers } from 'hardhat';

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

export async function deployDeepLink1155Fixture() {
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

  const mintInitialBatch = () => {
    return deepLink.mintBatch(
      owner.address,
      [INITIAL_TOKEN_ID],
      [1],
      [ELEMENT_ID],
      [CONSERVATION_ID],
      ethers.encodeBytes32String('')
    );
  };

  return {
    deepLink,
    mintInitial,
    mintInitialBatch,
    initialTokenId: INITIAL_TOKEN_ID,
    initialElementId: ELEMENT_ID,
    initialConservationId: CONSERVATION_ID,
    owner,
  };
}
