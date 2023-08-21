// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "./abstracts/Linkable.sol";

/// @custom:security-contact vadim@sovereignnature.com
contract DeepLink1155 is ERC1155, Ownable, ERC1155Burnable, Linkable {
    constructor() ERC1155("https://link.sovereignnature.com/api/") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        string[] memory elementIds,
        string[] memory conservationIds,
        bytes memory data
    ) public onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            _elementIds[ids[i]] = elementIds[i];
            _conservationIds[ids[i]] = conservationIds[i];
        }

        _mintBatch(to, ids, amounts, data);
    }
}
