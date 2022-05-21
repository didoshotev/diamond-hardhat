// const { expect } = require("chai");
// const { utils } = require("ethers");
// const { ethers } = require("hardhat");
// const hre = require("hardhat");


// describe("Diamond Storage demo test", () => {

//     beforeEach(async() => { 
//         const LibA = await ethers.getContractFactory("LibA");
//         const libA = await LibA.deploy();

//         const FacetA = await ethers.getContractFactory("FacetA");
//         const facetA = await FacetA.deploy();

//         const bytes32Data = utils.keccak256(utils.toUtf8Bytes("Deffect is here"));
//         console.log(bytes32Data);
//         const setDataTx = await facetA.setData(bytes32Data);

//         const getDataTx = await facetA.getData();
//         console.log('getDataTx: :', getDataTx);
//     })

//     it("initial test", () => {
//         expect(1).to.equal(1);
//     })
// })