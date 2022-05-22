// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Test1Facet {
    event TestEvent(address something);

    function getStringBytes32(string calldata _word) external pure returns (bytes32) {
        return keccak256(abi.encodePacked(_word));
    }

    function test1Func2() external {}

    function test1Func3() external {}

    function test1Func4() external {}

    function supportsInterface(bytes4 _interfaceID)
        external
        view
        returns (bool)
    {}
}
