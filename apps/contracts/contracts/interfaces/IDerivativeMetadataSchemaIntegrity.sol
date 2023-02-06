// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IDerivativeMetadataSchemaIntegrity {
    /**
     * @dev Returns JSON schema that needs to be implemented in derrivatives.
     */
    function derivativeMetadataSchemaURI() external view returns (string memory);

    /**
     * @dev Returns hash and the hashing alghoritm for the derrivative schema.
     */
    function derivativeMetadataSchemaIntegrity()
        external
        view
        returns (bytes memory digest, string memory hashAlgorithm);
}
