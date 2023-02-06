// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IDerrivativeMetadataSchemaIntegrity {
    /**
     * @dev Returns JSON schema that needs to be implemented in derrivatives.
     */
    function derrivativeMetadataSchemaURI() external view returns (string memory);

    /**
     * @dev Returns hash and the hashing alghoritm for the derrivative schema.
     */
    function derrivativeMetadataSchemaIntegrity()
        external
        view
        returns (bytes memory digest, string memory hashAlgorithm);
}
