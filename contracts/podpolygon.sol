// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ProofOfDonation is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("ProofOfDonation", "POD") {}

    mapping(address => mapping(address => uint256)) public minters;

    mapping(address => string) public poolAddressToURI;

    function addPool(address poolContractAddress, string memory uri)
        public
        onlyOwner
    {
        poolAddressToURI[poolContractAddress] = uri;
    }

    function safeMint(address poolContractAddress) public {
        // to do handle nft id == 0 (only first nft)
        require(minters[msg.sender][poolContractAddress] == 0);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        minters[msg.sender][poolContractAddress] = tokenId;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, poolAddressToURI[poolContractAddress]);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
