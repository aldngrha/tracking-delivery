require("@matterlabs/hardhat-zksync-solc");
require("@matterlabs/hardhat-zksync-verify");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.4.1",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
  //   zkSyncSepoliaTestnet: {
  //     url: "https://sepolia.era.zksync.dev",
  //     ethNetwork: "sepolia",
  //     zksync: true,
  //     chainId: 300,
  //     verifyURL:
  //       "https://explorer.sepolia.era.zksync.dev/contract_verification",
  //   },
  //   zkSyncMainnet: {
  //     url: "https://mainnet.era.zksync.io",
  //     ethNetwork: "mainnet",
  //     zksync: true,
  //     chainId: 324,
  //     verifyURL:
  //       "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
  //   },
  // },
    sepolia: {
      url: process.env.SEPOLIA_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  sourcify: {
    enabled: true
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
