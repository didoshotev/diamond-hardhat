const { assert, expect } = require('chai')

const {
    getSelectors,
    FacetCutAction,
    removeSelectors,
    findAddressPositionInFacets
} = require('../scripts/libraries/diamond.js')

const { deployDiamond } = require("../scripts/deploy")
const { ethers } = require('hardhat')
const { utils } = require('ethers')

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
        // console.log('facets: ', allFacets);
    })

    it("should have 3 facets", async () => {
        for (const address of await diamondLoupeFacet.facetAddresses()) {
            addresses.push(address);
        }

        assert.equal(addresses.length, 3);
    })

    it("facets should have the right function selectors -- call to facetFunctionSelectors function", async () => {
        assert.equal(
            addresses[0],
            await diamondLoupeFacet.facetAddress('0x1f931c1c')
        )
        assert.equal(
            addresses[1],
            await diamondLoupeFacet.facetAddress('0xcdffacc6')
        )
        assert.equal(
            addresses[1],
            await diamondLoupeFacet.facetAddress('0x01ffc9a7')
        )
        assert.equal(
            addresses[2],
            await diamondLoupeFacet.facetAddress('0xf2fde38b')
        )
    })

    it("should ADD test1 function", async () => {
        const Test1Facet = await ethers.getContractFactory("Test1Facet");
        const test1Facet = await Test1Facet.deploy();
        await test1Facet.deployed();
        addresses.push(test1Facet.address);
        
        // diamondLoupeFacet = await ethers.getContractAt("DiamondLoupeFacet", diamondAddress);
        

        const facetFuncSelectorsBefore = await diamondLoupeFacet.facets();
        console.log('facetFuncSelectorsBefore: ', facetFuncSelectorsBefore);

        const selectors = getSelectors(test1Facet).remove(['supportsInterface(bytes4)']);


        const tx = await diamondCutFacet.diamondCut(
            [{
                facetAddress: test1Facet.address,
                action: FacetCutAction.Add,
                functionSelectors: selectors
            }],
            ethers.constants.AddressZero,
            "0x",
            { gasLimit: 800000 }
        )
        const receipt = await tx.wait();
        if (!receipt.status) {
            throw Error(`Diamond upgrade failed: ${tx.hash}`);
        }

        const facetFuncSelectorsAfter = await diamondLoupeFacet.facets();
        console.log('facetFuncSelectorsAfter: ', facetFuncSelectorsAfter);

        const facetFunctionSelectors = await diamondLoupeFacet.facetFunctionSelectors(test1Facet.address);
        assert.sameMembers(facetFunctionSelectors, selectors);
    })

    // it("should test test1Facet getStringBytes32", async() => { 
    //     const test1Facet = await ethers.getContractAt("Test1Facet", diamondAddress);
    //     const word = "Not Deffect";
    //     const callResult = await test1Facet.getStringBytes32(word);
    //     const ethersResult = utils.keccak256(utils.toUtf8Bytes(word));
        
    //     assert.equal(callResult, ethersResult);
    // })

    // it('should replace supportsInterface function', async () => {
    //     const Test1Facet = await ethers.getContractFactory('Test1Facet')
    //     const selectors = getSelectors(Test1Facet).get(['supportsInterface(bytes4)'])
    //     const testFacetAddress = addresses[3]
    //     tx = await diamondCutFacet.diamondCut(
    //       [{
    //         facetAddress: testFacetAddress,
    //         action: FacetCutAction.Replace,
    //         functionSelectors: selectors
    //       }],
    //       ethers.constants.AddressZero, '0x', { gasLimit: 800000 })
    //     receipt = await tx.wait()
    //     if (!receipt.status) {
    //       throw Error(`Diamond upgrade failed: ${tx.hash}`)
    //     }
    //     result = await diamondLoupeFacet.facetFunctionSelectors(testFacetAddress)
    //     assert.sameMembers(result, getSelectors(Test1Facet))
    //   })

    // it("should REMOVE test1Facet", async() => { 
    //     const Test1Facet = await ethers.getContractFactory("Test1Facet");
    //     const test1Facet = await Test1Facet.deploy();
    //     await test1Facet.deployed();

    //     console.log('test1Facet at: ', test1Facet.address);
    //     const selectors = getSelectors(test1Facet).remove(['supportsInterface(bytes4)']);

    //     const facetAddressesBefore = await diamondLoupeFacet.facetAddresses();
    //     addresses.pop();

    //     const removeTx = await diamondCutFacet.diamondCut(
    //         [{ 
    //             facetAddress: ethers.constants.AddressZero,
    //             action: FacetCutAction.Remove,
    //             functionSelectors: selectors
    //         }],
    //         ethers.constants.AddressZero,
    //         "0x",
    //         { gasLimit: 800000 }
    //     )
    //     const receipt = await removeTx.wait();
    //     if(!receipt.status) { 
    //         throw Error(`Diamond failed to remove: ${removeTx.hash}`, );
    //     }
    //     console.log('Successfully removed...!');
        
    //     const facetAddressesAfter = await diamondLoupeFacet.facetAddresses();
    //     // console.log('after facet addresses: ', facetAddressesAfter);
    //     assert.notEqual(facetAddressesBefore.length, facetAddressesAfter.length);
    // })

})
