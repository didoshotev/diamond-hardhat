// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LibA.sol";
import "hardhat/console.sol";


contract FacetA { 

    function setData(bytes32 _dataA) external { 
        LibA.DiamondStorage storage ds = LibA.diamondStorage();
        // require(ds.owner == msg.sender, "Only owner can call this function!");
        ds.dataA = _dataA;
    }

    function getData() external view returns (bytes32) { 
        return LibA.diamondStorage().dataA;
    }
}