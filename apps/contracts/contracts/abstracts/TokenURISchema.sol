// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../interfaces/ITokenURISchema.sol";

abstract contract TokenURISchema is ITokenURISchema {
    string private _tokenURISchema;

    function setTokenURISchema(string memory __tokenURISchema) internal virtual {
        _tokenURISchema = __tokenURISchema;
    }

    function tokenURISchema() external view virtual returns (string memory) {
        return _tokenURISchema;
    }
}
