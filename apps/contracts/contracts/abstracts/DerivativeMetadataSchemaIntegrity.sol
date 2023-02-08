// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../interfaces/IDerivativeMetadataSchemaIntegrity.sol";

abstract contract DerivativeMetadataSchemaIntegrity is IDerivativeMetadataSchemaIntegrity {
    string private _schemaURI;
    bytes private _schemaDigest;
    string private _hashAlgorithm = "keccak256";

    function setDerivativeMetadataSchemaURI(string memory schemaURI) internal virtual {
        _schemaURI = schemaURI;
    }

    function derivativeMetadataSchemaURI() external view virtual returns (string memory schemaURI) {
        return _schemaURI;
    }

    function setDerivativeMetadataSchemaDigest(bytes memory digest) internal virtual {
        _schemaDigest = digest;
    }

    function derivativeMetadataSchemaIntegrity()
        external
        view
        virtual
        returns (bytes memory digest, string memory hashAlgorithm)
    {
        return (_schemaDigest, _hashAlgorithm);
    }
}
