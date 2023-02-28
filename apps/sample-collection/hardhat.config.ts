import '@nomicfoundation/hardhat-toolbox';
import { moonbaseConfig } from '@sni/configs/hardhat/networks';
import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    moonbase: moonbaseConfig,
  },
};

export default config;
