import '@nomicfoundation/hardhat-toolbox';
import { abiConfig } from '@sni/configs/hardhat';
import { moonbaseConfig } from '@sni/configs/hardhat/networks';
import * as dotenv from 'dotenv';
import 'hardhat-abi-exporter';
import { HardhatUserConfig } from 'hardhat/config';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    moonbase: moonbaseConfig,
  },
  abiExporter: abiConfig,
};

export default config;
