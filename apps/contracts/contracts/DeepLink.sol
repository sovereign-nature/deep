// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./abstracts/Linkable.sol";

/// @custom:security-contact vadim@sovereignnature.com
contract DeepLink is ERC721, ERC721Burnable, Ownable, Linkable {
    constructor() ERC721("DeepLink", "DLK") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://link.sovereignnature.com/api/";
    }

    function safeMint(
        address to,
        uint256 tokenId,
        string memory _elementId,
        string memory _conservationId
    ) public onlyOwner {
        _elementIds[tokenId] = _elementId;
        _conservationIds[tokenId] = _conservationId;

        _safeMint(to, tokenId);
    }
}
