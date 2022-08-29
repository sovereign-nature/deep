// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../interfaces/IOraclized.sol";

abstract contract Oraclized is IOraclized {
    mapping(uint256 => uint256) private _statuses;

    function statusOf(uint256 tokenId) external view virtual returns (uint256) {
        uint256 _status = _statuses[tokenId];

        return _status;
    }

    function setStatus(uint256 tokenId, uint256 _status) public virtual {
        _statuses[tokenId] = _status;

        emit StatusSet(tokenId, _status);
    }
}
