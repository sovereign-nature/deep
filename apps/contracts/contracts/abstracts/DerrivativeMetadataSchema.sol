// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../interfaces/IDerrivativeMetadataSchema.sol";

abstract contract DerrivativeMetadataSchema is IDerrivativeMetadataSchema {
    string private _derrivativeMetadataSchema;

    function setDerrivativeMetadataSchema(string memory __derrivativeMetadataSchema) internal {
        _derrivativeMetadataSchema = __derrivativeMetadataSchema;
    }

    function derrivativeMetadataSchema() external view returns (string memory) {
        return _derrivativeMetadataSchema;
    }
}
