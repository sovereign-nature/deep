// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../interfaces/ITokenURISchema.sol";

abstract contract TokenURISchema is ITokenURISchema {
    string private _schemaURI;
    mapping(uint256 => bytes) private _tokenURIDigests;
    bytes private _schemaDigest;
    string private _hashAlgorithm = "sha256";

    function setTokenURISchema(string memory schemaURI) internal virtual {
        _schemaURI = schemaURI;
    }

    function setTokenURISchemaDigest(bytes memory digest) internal virtual {
        _schemaDigest = digest;
    }

    function tokenURISchema() external view virtual returns (string memory schemaURI) {
        return _schemaURI;
    }

    function setTokenURIDigest(uint256 tokenId, bytes memory digest) internal virtual {
        _tokenURIDigests[tokenId] = digest;
    }

    function tokenURIIntegrity(
        uint256 tokenId
    ) external view virtual returns (bytes memory digest, string memory hashAlgorithm) {
        return (_tokenURIDigests[tokenId], _hashAlgorithm);
    }

    function tokenURISchemaIntegrity()
        external
        view
        virtual
        returns (
            // TODO: We are planning to use single schema for whole collection, so ERC2477 is not needed here
            bytes memory digest,
            string memory hashAlgorithm
        )
    {
        return (_schemaDigest, _hashAlgorithm);
    }
}
