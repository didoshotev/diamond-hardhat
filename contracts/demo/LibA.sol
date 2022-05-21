// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library LibA { 

    struct DiamondStorage {
        address owner;
        bytes32 dataA;
    }

    function diamondStorage() internal pure returns(DiamondStorage storage ds) {
        // Specifies a random position in the contract storage
        // can be generated depending on logic data, for instance:
        // bytes32 storagePositon = keccak256(abi.encodePacked(ERC1155.interfaceId, ERC1155.name, address(this)));
        bytes32 storagePosition = keccak256("Deffect the dev");
        
        // set the position of our struct in the storage
        assembly { 
            ds.slot := storagePosition
        }
    }
}