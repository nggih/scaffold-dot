// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.4.0
pragma solidity ^0.8.28;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract nggihERC721 is ERC721, Ownable {
    uint256 private _nextTokenId;
    string private _baseTokenURI;

    constructor(address initialOwner) ERC721("nggihERC721", "NGG721") Ownable(initialOwner) {}

    function safeMint(address to) external onlyOwner returns (uint256 tokenId) {
        tokenId = _nextTokenId;
        _nextTokenId += 1;
        _safeMint(to, tokenId);
    }

    function setBaseURI(string memory baseTokenURI) external onlyOwner {
        _baseTokenURI = baseTokenURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}
