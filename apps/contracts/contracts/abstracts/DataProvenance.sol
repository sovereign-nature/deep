// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../interfaces/IDataProvenance.sol";

abstract contract DataProvenance is IDataProvenance {
    mapping(uint256 => string) private _dataURIs;

    function dataURI(uint256 tokenId) external view virtual returns (string memory) {
        string memory _computeURI = _dataURIs[tokenId];

        return _computeURI;
    }

    function setDataURI(uint256 tokenId, string memory _dataURI) public virtual {
        _dataURIs[tokenId] = _dataURI;

        emit DataURISet(tokenId, _dataURI);
    }
}
