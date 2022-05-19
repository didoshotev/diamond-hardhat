const { ethers, upgrades } = require("hardhat");

async function main() {
    // The 2nd time we call deployProxy it'll only deploy the implementation
    const Gem = await ethers.getContractFactory("Gem");
    const gemProxy = await upgrades.deployProxy(Gem, [42], { initializer: "store" });
    console.log('gemProxy deployed to: ', gemProxy.address);

    // should be separated but in hardhat network, there is no access to previos version address
    console.log("Upgrading.....");
    const GemV2 = await ethers.getContractFactory("GemV2");
    await upgrades.upgradeProxy(gemProxy.address, GemV2);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1)
    })