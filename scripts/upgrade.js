const { ethers, upgrades } = require("hardhat");

async function main() {
    const PROXY_ADDRESS = "0x000";
    const GemV2 = await ethers.getContractFactory("GemV2");
    let gem = await upgrades.upgradeProxy(PROXY_ADDRESS, GemV2);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1)
    })