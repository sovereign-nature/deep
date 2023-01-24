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

/// @custom:security-contact vadim@sovereignnature.com
contract SovereignNatureIdentifier is
    ERC721,
    ERC721URIStorage,
    AccessControl,
    IUpdatableNFT,
    Oraclized,
    ComputeProvenance,
    DataProvenance
{
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");

    Counters.Counter private _tokenIdCounter;

    /**
     * @dev Emitted when new token is minted.
     */
    event TokenMinted(uint256 indexed tokenId, string uri, address owner);

    constructor() ERC721("Sovereign Nature Identifier", "SNI") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(ORACLE_ROLE, msg.sender);
    }

    function safeMint(
        address to,
        string memory _tokenUri,
        string memory _dataURI,
        string memory _computeURI,
        uint256 _status
    ) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenUri);

        // Set initial status for minted token and emit creation event.
        setStatus(tokenId, _status);
        setComputeURI(tokenId, _computeURI);
        setDataURI(tokenId, _dataURI);

        emit TokenMinted(tokenId, _tokenUri, to);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) external onlyRole(MINTER_ROLE) {
        _setTokenURI(tokenId, _tokenURI);

        emit TokenURISet(tokenId, _tokenURI);
    }

    // Overrides for permissions control
    function setStatus(uint256 tokenId, uint256 _status) public override onlyRole(ORACLE_ROLE) {
        require(_exists(tokenId), "Status set of nonexistent token");

        super.setStatus(tokenId, _status);
    }

    function setComputeURI(uint256 tokenId, string memory _computeURI) public override onlyRole(ORACLE_ROLE) {
        require(_exists(tokenId), "Status set of nonexistent token"); // TODO: rename to "computeURI set of nonexistent token"

        super.setComputeURI(tokenId, _computeURI);
    }

    function setDataURI(uint256 tokenId, string memory _dataURI) public override onlyRole(ORACLE_ROLE) {
        require(_exists(tokenId), "Status set of nonexistent token"); //TODO: rename to "dataURI set of nonexistent token"

        super.setDataURI(tokenId, _dataURI);
    }
}
