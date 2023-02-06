// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ITokenURISchema {
    /**
     * @dev Returns JSON schema for tokenURI.
     */
    function tokenURISchema() external view returns (string memory);
}
