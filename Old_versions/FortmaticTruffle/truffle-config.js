const HDWalletProvider = require("truffle-hdwallet-provider");
const memonic = "enhance prefer gospel staff reward youth forward curve before predict crouch bottom"
module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(memonic, "https://rinkeby.infura.io/v3/55df60f9931f4666b1bf8cbf2d38c745")
      },
      network_id: 3
    }
  }
};