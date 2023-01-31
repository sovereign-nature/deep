// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IDerrivativeMetadataSchema {
    /**
     * @dev Returns JSON schema that needs to be implemented in derrivatives.
     */
    function derrivativeMetadataSchema() external view returns (string memory);
}
