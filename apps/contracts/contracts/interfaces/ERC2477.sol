// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.9;

/// @title ERC-2477 Token Metadata Integrity
/// @dev See https://eips.ethereum.org/EIPS/eip-2477
/// @dev The ERC-165 identifier for this interface is 0x832a7e0e
interface ERC2477 {
    /// @notice Get the cryptographic hash of the specified tokenID's metadata
    /// @param  tokenId       Identifier for a specific token
    /// @return digest        Bytes returned from the hash algorithm, or "" if not available
    /// @return hashAlgorithm The name of the cryptographic hash algorithm, or "" if not available
    function tokenURIIntegrity(
        uint256 tokenId
    ) external view returns (bytes memory digest, string memory hashAlgorithm);

    /// @notice Get the cryptographic hash for the specified tokenID's metadata schema
    /// @param  tokenId       Identifier for a specific token
    /// @return digest        Bytes returned from the hash algorithm, or "" if not available
    /// @return hashAlgorithm The name of the cryptographic hash algorithm, or "" if not available
    function tokenURISchemaIntegrity(
        uint256 tokenId
    ) external view returns (bytes memory digest, string memory hashAlgorithm);
}
