// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IDataProvenance {
    /**
     * @dev Emitted when new source dataset is set.
     */
    event DataURISet(uint256 indexed tokenId, string dataURI);

    /**
     * @dev Returns identified object source dataset.
     */
    function dataURI(uint256 tokenId) external view returns (string memory);

    /**
     * @dev Sets identified object source dataset.
     */
    function setDataURI(uint256 tokenId, string memory dataURI) external;
}
