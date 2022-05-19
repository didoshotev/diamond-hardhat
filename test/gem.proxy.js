const { expect } = require("chai");
const { ethers } = require("hardhat");

let Gem;
let gem;

describe("Gem", function () {
    beforeEach(async function() { 
        Gem = await ethers.getContractFactory("Gem");
        gem = await upgrades.deployProxy(Gem, [42], { initializer: "store"});
        await gem.deployed();
        console.log("Gem deployed to: ", gem.address);
    })

    it("returns the initial value", async function() { 
        const value = await(await gem.retrieve()).toString();
        expect(value).to.equal("42");
    })
});
