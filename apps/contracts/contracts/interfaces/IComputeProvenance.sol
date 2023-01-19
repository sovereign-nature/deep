// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IComputeProvenance {
    /**
     * @dev Emitted when new compute script was set.
     */
    event ComputeURISet(uint256 indexed tokenId, string computeURI);

    /**
     * @dev Returns identified object compute script.
     */
    function computeURI(uint256 tokenId) external view returns (string memory);

    /**
     * @dev Sets identified object scompute script.
     */
    function setComputeURI(uint256 tokenId, string memory computeURI) external;
}
