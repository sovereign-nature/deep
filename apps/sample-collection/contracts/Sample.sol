// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@sni/solidity-interfaces/contracts/interfaces/IDerrivative.sol";

/// @custom:security-contact vadim.smakhtin@sovereignnature.com
contract Sample is ERC721, Ownable, IDerrivative {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("SNI-Sample", "SNI-S") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://test-metadata";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function identifierAddress(uint256 tokenId) external view override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = "test-address-";
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
    }
}
