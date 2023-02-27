// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IDerrivative {
    /**
     * @dev Returns identified object source dataset.
     */
    function identifierAddress(uint256 tokenId) external view returns (string memory);
}
