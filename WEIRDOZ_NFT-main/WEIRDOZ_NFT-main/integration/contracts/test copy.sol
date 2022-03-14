pragma solidity ^0.8.2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract test is  Ownable, ERC721A, ReentrancyGuard {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    

    uint public constant MAX_SUPPLY = 6666;
    uint public constant MAX_WHITELIST = 2500;
    uint64 public PRICE = 0.3 ether;
    uint public WHITELIST_PRICE = 0.1 ether ;
    uint public constant MAX_PER_WHITELIST = 2;
    uint256 public MAX_PER_USER = 5;
    bool public revealed = false;
    bool public saleIsActive = false;
    bool public whitelistSaleIsActive = false;
    string public baseTokenURI;
    string public notRevealedUri;

    //The root hash of the Merkle Tree
    bytes32 public merkleRoot ;
    // mapping variable to mark whitelist addresses as having claimed.
    mapping(address => uint) public whitelistClaimed ;

    /*
	 * Constructor
	 */
    constructor(string memory notRevealBaseURI) ERC721A("Crazy Rabbit", "CRA") {
        setNotRevealedUri(notRevealBaseURI);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    /// Set the base URI for the metadata
	/// @dev modifies the state of the `_merkleRoot` variable
	/// @param _merkleRoot the merkleRoot to set as the _merkleRoot
    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    /// Set the base URI for the metadata
	/// @dev modifies the state of the `_tokenBaseURI` variable
	/// @param _baseTokenURI the URI to set as the base token URI
    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    /// Set the base URI for the metadata
	/// @dev modifies the state of the `_tokenBaseURI` variable
	/// @param _notRevealedUri the URI to set as the base token URI
    function setNotRevealedUri(string memory _notRevealedUri) public onlyOwner {
        notRevealedUri = _notRevealedUri;
    }

    /// Adjust the mint price
	/// @dev modifies the state of the `mintPrice` variable
	/// @notice sets the price for minting a token
	/// @param newPrice_ The new price for minting
    function adjustMintPrice(uint64 newPrice_) external onlyOwner {
		PRICE = newPrice_;
	}

	/// Reserve tokens for the team + marketing + dev
	/// @dev Mints the number of tokens passed in as count to the _teamAddress
	/// @param count The number of tokens to mint
    function reserveNFTs(uint256 count) public onlyOwner {
        uint totalMinted = _tokenIds.current();

        require(totalMinted.add(count) < MAX_SUPPLY, "Not enough NFTs left to reserve");
        _safeMint(msg.sender, count);
        
    }
    modifier callerIsUser() {
        require(tx.origin == msg.sender, "The caller is another contract");
        _;
    }

    /// Public minting open to all
	/// @dev mints tokens during public sale, limited by `MAX_MINTS_PER_ADDRESS`
	/// @param _count number of tokens to mint in transaction
    function mintNFTs(bytes32[] calldata _merkleProof ,uint _count) external payable callerIsUser {
        uint totalMinted = _tokenIds.current();
        require(saleIsActive == true, "Sale not active!");
        require(totalMinted.add(_count) < MAX_SUPPLY +1 , "Not enough NFTs left!");
        
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        if(MerkleProof.verify(_merkleProof, merkleRoot, leaf)){
            require(
                balanceOf(msg.sender) + _count < MAX_PER_USER +1 +MAX_PER_WHITELIST,
                "You are not allowed to mint this many!"
            );
        }
        else {
            require(
                balanceOf(msg.sender) + _count < MAX_PER_USER +1 ,
                "You are not allowed to mint this many!"
            );
        }
        uint256 totalCost = PRICE * _count;
        _safeMint(msg.sender, _count);
        _tokenIds.increment();
        refundIfOver(totalCost);
        
    }
  function refundIfOver(uint256 price) private {
    require(msg.value >= price, "Need to send more ETH.");
    if (msg.value > price) {
      payable(msg.sender).transfer(msg.value - price);
    }
  }
    

    /// Public minting open to all
	/// @dev mints tokens during public sale, limited by `MAX_MINTS_PER_ADDRESS`
	/// @param _count number of tokens to mint in transaction
    function whitelistMintNFTs(bytes32[] calldata _merkleProof , uint _count) external payable callerIsUser {

        uint totalMinted = _tokenIds.current();
        require(whitelistClaimed[msg.sender] < MAX_PER_WHITELIST +1, "Address has already claimed.");
        require(whitelistSaleIsActive == true, "Whitelist sale not active!");        
        require(totalMinted.add(_count) < MAX_WHITELIST +1, "Not enough NFTs left!");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "You are not on the whitelist");
             
        require(
            balanceOf(msg.sender) + _count < MAX_PER_WHITELIST+1,
            "You are not allowed to mint this many!"
        );
        uint256 totalCost = PRICE * _count;
        _safeMint(msg.sender, _count);
        _tokenIds.increment();
        refundIfOver(totalCost);
    }


    function tokensOfOwner(address _owner) external view returns (uint[] memory) {

        uint tokenCount = balanceOf(_owner);
        uint[] memory tokensId = new uint256[](tokenCount);

        for (uint i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    function withdraw() public payable onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");

        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }
    

    function reveal() public onlyOwner {
        revealed = true;
    }

    function activeSale() public onlyOwner {
        saleIsActive = true;
    }

    function whitelistActiveSale() public onlyOwner {
        whitelistSaleIsActive = true;
    }
    
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        if (revealed == false) {
            return 
                string(
                    abi.encodePacked(
                        notRevealedUri ,                        
                        Strings.toString(tokenId)                        
                    )
                );
        }
        
        return 
            string(
                    abi.encodePacked(
                        baseTokenURI , 
                        Strings.toString(tokenId)                        
                    )
                );
    }

}