//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/Proxy.sol";

//driver  for the Wi-Fi adapter
// Windows couldn't automatically bind the IP protocol stack to the network adapter.
contract ProxyCaller {
    

    // delegtes call to the implementation contract.
    // The implementation logic from the contract will be executed using the state variables from this proxy     
    // fallback() external {
    //     assembly {
    //         let ptr :=mload(0x40)
    //         // (1) copy incoming call data
    //         calldatacopy(ptr, 0, calldatasize)

    //         // (2) forward call to logic contract
    //         let result := delegatecall(gas, _impl, ptr, calldatasize, 0, 0)
    //         let size := returndatasize

    //         // (3) retrieve return data
    //         returndatacopy(ptr, 0, size)

    //         // (4) forward return data back to caller
    //         switch result
    //         case 0 {
    //             revert(ptr, size)
    //         }
    //         default {
    //             return(ptr, size)
    //         }
    //     }
    // }
}
