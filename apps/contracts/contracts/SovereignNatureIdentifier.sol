// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IUpdatableNFT.sol";
import "./abstracts/Oraclized.sol";
import "./abstracts/ComputeProvenance.sol";
import "./abstracts/DataProvenance.sol";
import "./abstracts/TokenURISchema.sol";
import "./abstracts/DerivativeMetadataSchemaIntegrity.sol";

/// @custom:security-contact vadim@sovereignnature.com
contract SovereignNatureIdentifier is
    ERC721,
    ERC721URIStorage,
    AccessControl,
    IUpdatableNFT,
    Oraclized,
    ComputeProvenance,
    DataProvenance,
    TokenURISchema,
    DerivativeMetadataSchemaIntegrity
{
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");

    Counters.Counter private _tokenIdCounter;

    /**
     * @dev Emitted when new token is minted.
     */
    event TokenMinted(uint256 indexed tokenId, string uri, address owner);

    constructor(
        string memory _tokenURISchema,
        bytes memory _tokenURISchemaDigest,
        string memory _derrivativeMetadataSchemaURI,
        bytes memory _derrivativeMetadataSchemaDigest
    ) ERC721("Sovereign Nature Identifier", "SNI") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(ORACLE_ROLE, msg.sender);

        setTokenURISchema(_tokenURISchema);
        setTokenURISchemaDigest(_tokenURISchemaDigest);

        setDerivativeMetadataSchemaURI(_derrivativeMetadataSchemaURI);
        setDerivativeMetadataSchemaDigest(_derrivativeMetadataSchemaDigest);
    }

    function safeMint(
        address to,
        string memory _tokenURI,
        bytes memory _tokenUriDigest,
        string memory _dataURI,
        string memory _computeURI,
        uint256 _status
    ) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        // Set initial status for minted token and emit creation event.
        setStatus(tokenId, _status);
        setComputeURI(tokenId, _computeURI);
        setDataURI(tokenId, _dataURI);

        setTokenURIDigest(tokenId, _tokenUriDigest);

        emit TokenMinted(tokenId, _tokenURI, to);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId); //TODO: add missing interfaces
    }

    function setTokenURI(
        uint256 tokenId,
        string memory _tokenURI,
        bytes memory _tokenURIDigest
    ) external onlyRole(MINTER_ROLE) {
        _setTokenURI(tokenId, _tokenURI);
        setTokenURIDigest(tokenId, _tokenURIDigest);

        emit TokenURISet(tokenId, _tokenURI); //TODO: Emit event with digest
    }

    // Overrides for permissions control
    function setStatus(uint256 tokenId, uint256 _status) public override onlyRole(ORACLE_ROLE) {
        require(_exists(tokenId), "Status set of nonexistent token");

        super.setStatus(tokenId, _status);
    }

    function setComputeURI(uint256 tokenId, string memory _computeURI) public override onlyRole(ORACLE_ROLE) {
        require(_exists(tokenId), "computeURI set of nonexistent token");

        super.setComputeURI(tokenId, _computeURI);
    }

    function setDataURI(uint256 tokenId, string memory _dataURI) public override onlyRole(ORACLE_ROLE) {
        require(_exists(tokenId), "dataURI set of nonexistent token");

        super.setDataURI(tokenId, _dataURI);
    }
}
