import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
import 'hardhat-abi-exporter';
import 'hardhat-gas-reporter';
import { HardhatUserConfig } from 'hardhat/config';
import 'solidity-coverage';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.20',
  networks: {
    // Moonbase Alpha network specification
    moonbase: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
      chainId: 1287, // 0x507 in hex,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  abiExporter: {
    runOnCompile: true,
    clear: true,
    path: './abi',
  },
  gasReporter: {
    enabled: true,
  },
};

export default config;
