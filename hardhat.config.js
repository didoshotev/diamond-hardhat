require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require("@openzeppelin/hardhat-upgrades")
require('dotenv').config()


const INFURA_URL = `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`;

// yarn add @nomiclabs/hardhat-upgrades ethers hardhat @openzeppelin/contracts @openzeppelin/contracts-upgradeable

module.exports = {
	solidity: "0.8.4",
	defaultNetwork: "hardhat",
	// networks: {
	// 	hardhat: {
	// 		chainId: 43114,
	// 		gasPrice: 225000000000,
	// 		throwOnTransactionFailures: true,
	// 		loggingEnabled: false,

	// 		forking: {
	// 			url: "https://api.avax.network/ext/bc/C/rpc",
	// 			enabled: true,
	// 			blockNumber: 8528605
	// 		},
	// 	},
	// 	rinkeby: {
	// 		url: INFURA_URL,
	// 		accounts: [
	// 			process.env.WALLET_PRIVATE_KEY,
	// 			process.env.TEAM_WALLET_PRIVATE_ADDRESS,
	// 			process.env.TREASURY_PRIVATE_KEY
	// 		],
	// 		live: true,
	// 		saveDeployments: true,
	// 		tags: ["rinkeby-test-network"]
	// 	}
	// },
};
