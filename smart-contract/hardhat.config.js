require("@nomicfoundation/hardhat-toolbox");
const { config } = require("dotenv");
const { resolve } = require("path");
config({ path: resolve(__dirname, "./.env") });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    local: {
      chainId: 31337,
      url: "http://localhost:8545",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
