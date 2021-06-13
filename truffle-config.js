require('dotenv').config()
const wrapProvider = require('arb-ethers-web3-bridge').wrapProvider
const HDWalletProvider = require('@truffle/hdwallet-provider')

const mnemonic = process.env.MNEMONIC

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.matic.today`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    arbitrum: {
      provider: function () {
        return wrapProvider(
          new HDWalletProvider(mnemonic, 'http://localhost:8545/')
        )
      },
      network_id: '*', // Match any network id
      gasPrice: 0,
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
        )
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 4
    },
    goerli: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
        )
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 5
    },
    remote_arbitrum: {
      provider: function () {
        return wrapProvider(
          new HDWalletProvider(mnemonic, 'https://kovan5.arbitrum.io/rpc')
        )
      },
      network_id: '*', // Match any network id
      gasPrice: 0,
    },
  },
  compilers: {
    solc: {
      version: '0.8.5', // Fetch exact version from solc-bin (default: truffle's version)
      docker: true, // Use "0.5.3" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
}
