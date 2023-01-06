import '@nomicfoundation/hardhat-toolbox';
import '@openzeppelin/hardhat-upgrades';
import * as dotenv from 'dotenv';
import 'hardhat-abi-exporter';
import { HardhatUserConfig } from 'hardhat/config';
import 'solidity-coverage';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.9',
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
};

export default config;
