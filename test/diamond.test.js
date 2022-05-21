const { assert, expect } = require('chai')

const {
    getSelectors,
    FacetCutAction,
    removeSelectors,
    findAddressPositionInFacets
} = require('../scripts/libraries/diamond.js')

const { deployDiamond } = require("../scripts/deploy")
const { ethers } = require('hardhat')

describe("Diamond MAIN TEST", async function () {
    let diamondAddress
    let diamondCutFacet
    let diamondLoupeFacet
    let ownershipFacet
    let tx
    let receipt
    let result
    const addresses = []

    before(async function () {
        console.log('deploying diamond...');
        diamondAddress = await deployDiamond();
        console.log('-----------------------Diamond deployed-----------------------');
        diamondCutFacet = await ethers.getContractAt("DiamondCutFacet", diamondAddress);
        diamondLoupeFacet = await ethers.getContractAt("DiamondLoupeFacet", diamondAddress);
        ownershipFacet = await ethers.getContractAt("OwnershipFacet", diamondAddress);

        // console.log('DiamondLoupeFacet: ', diamondLoupeFacet);
        const allFacets = await diamondLoupeFacet.facets();
        console.log('facets: ', allFacets);
    })

    it("should have 3 facets", async () => {
        for(const address of await diamondLoupeFacet.facetAddresses()) { 
            addresses.push(address);
        }

        assert.equal(addresses.length, 3);
    })
})
