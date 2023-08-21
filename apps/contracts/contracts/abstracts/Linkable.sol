// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

abstract contract Linkable {
    mapping(uint256 => string) internal _elementIds;

    function elementId(uint256 tokenId) public view returns (string memory) {
        string memory _elementId = _elementIds[tokenId];

        return _elementId;
    }

    mapping(uint256 => string) internal _conservationIds;

    function conservationId(uint256 tokenId) public view returns (string memory) {
        string memory _conservationId = _conservationIds[tokenId];

        return _conservationId;
    }
}
