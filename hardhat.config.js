require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./app/src/artifacts",
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: "circle much knife glimpse cupboard story useless used coffee join float midnight",
      }
    }
  }
};
