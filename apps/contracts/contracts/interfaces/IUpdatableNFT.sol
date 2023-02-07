// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IUpdatableNFT {
    /**
     * @dev Emitted when `tokenURI` is updated for selected `tokenId`.
     */
    event TokenURISet(uint256 indexed tokenId, string tokenURI, bytes tokenURIDigest);

    /**
     * @dev Sets new token URI.
     */
    function setTokenURI(uint256 tokenId, string memory tokenURI, bytes memory tokenURIDigest) external;
}
