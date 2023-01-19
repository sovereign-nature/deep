// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../interfaces/IComputeProvenance.sol";

abstract contract ComputeProvenance is IComputeProvenance {
    mapping(uint256 => string) private _computeURIs;

    function computeURI(uint256 tokenId) external view virtual returns (string memory) {
        string memory _computeURI = _computeURIs[tokenId];

        return _computeURI;
    }

    function setComputeURI(uint256 tokenId, string memory _computeURI) public virtual {
        _computeURIs[tokenId] = _computeURI;

        emit ComputeURISet(tokenId, _computeURI);
    }
}
