import '@nomicfoundation/hardhat-toolbox';
import { moonbaseConfig } from '@sni/configs/hardhat/networks';
import { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    moonbase: moonbaseConfig,
  },
};

export default config;
