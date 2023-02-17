require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
/** @type import('hardhat/config').HardhatUserConfig */

const Goerli_RPC_URL= process.env.Goerli_RPC_URL;
const PRIVATE_KEY= process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY= process.env.ETHERSCAN_API_KEY;
module.exports = {
  defaultNetwork: "hardhat",
  networks:{
    goerli: {
      url: Goerli_RPC_URL,
      accounts: [PRIVATE_KEY], 
      chainId:5,

    },
    localhost:{
      url:"http://127.0.0.1:8545/",
      // accounts: hardhat has already placed for us
      chainId: 31337,
    },
  },
  solidity: "0.8.17",
  etherscan:{
    apiKey: ETHERSCAN_API_KEY
  },
  

  
};