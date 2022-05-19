//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Gem { 
    uint public value;

    event ValueChanged(uint newValue);

    function store(uint newValue) external { 
        console.log("store called with: ", newValue);
        value = newValue;
        emit ValueChanged(newValue);
    }

    function retrieve() public view returns(uint) { 
        return value;
    }
}