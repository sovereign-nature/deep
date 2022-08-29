// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IOraclized {
    /**
     * @dev Emitted when new status is set.
     */
    event StatusSet(uint256 indexed tokenId, uint256 status);

    /**
     * @dev Returns identified object `status` enum state in numerical form.
     */
    function statusOf(uint256 tokenId) external view returns (uint256);

    /**
     * @dev Sets identified object status, can be called only from oracle address.
     */
    function setStatus(uint256 tokenId, uint256 status) external;
}
