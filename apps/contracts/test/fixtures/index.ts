import {
  INITIAL_CONSERVATION_ID,
  INITIAL_ELEMENT_ID,
  INITIAL_TOKEN_ID,
} from '@sni/constants/mocks/identifier';
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
      INITIAL_ELEMENT_ID,
      INITIAL_CONSERVATION_ID
    );
  };

  return {
    deepLink,
    mintInitial,
    initialTokenId: INITIAL_TOKEN_ID,
    initialElementId: INITIAL_ELEMENT_ID,
    initialConservationId: INITIAL_CONSERVATION_ID,
    owner,
  };
}
