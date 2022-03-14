pragma solidity ^0.8.2;

contract ERC721{

   

     //pour rechercher par X et Y on met "index"
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId); //awner, adresse pour qui il approuve, et le nft id

    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);//utiliser dans la fonction pour activer un opperateur (activer une personne en particulier grace à l'index)

    event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);

    mapping(address => uint256) internal _balances;

    mapping(uint256 =>address) internal _owners;

    mapping(address =>mapping(address =>bool)) private _operatorApprovals; //mapping d'un mapping (associe un bool pour regarder si l'addresse est un opeérateur ou non => pour oir si peut moove le token)

    mapping(uint256 => address) private _tokenApprovals ; //ça dit qu'on peut avoir seulement une adresse approuvée


    //Returns the number of NFTs assigned to an owner
    function balanceOf(address owner) public view returns(uint256){
        require(owner != address(0), "address is zero"); // permet de regarder si l'addresse de l'owner n'est pas nulle
        return _balances[owner]; 

    }

    // find the owner of a NFT => lui donne un nft et renvoie une addresse a qui celui-ci appartient
    function ownerOf (uint256 tokenId) public view returns(address){
        address owner = _owners[tokenId];
        require(owner != address(0), "tokenID does not exist");
        return owner;

    }

    // Enables or disables an operator to manage all of msg.sender assets ; un opperateur => permet de dire par exemple que opensea peut gèrer un nft
    function setApprovalForAll(address operator, bool approved) public {
        _operatorApprovals[msg.sender][operator] = approved; // active ou désactive le fait d'être oppérateur
        emit ApprovalForAll(msg.sender, operator, approved); //émettre la fonction (c'est dans la doc) 

    }

    //check if an address is an operator for another address 
    function isApprovedForAll(address owner, address operator) public view returns(bool){
        return _operatorApprovals[owner][operator];   //retourne si cette personne est un opperateur pour tous

    }

    // Update an approve address for an NFT 
    function approve(address to, uint256 tokenId) public{
        address owner = ownerOf(tokenId); //celui qui a le nft?
        require(msg.sender == owner || isApprovedForAll(owner, msg.sender), "Msg.sender is not the owner or an approved operator"); //vérifie si le msg.sender est pas le owner et si il a l'autorisation
        _tokenApprovals[tokenId] = to ;
        emit Approval(owner, to, tokenId) ;//approuve qui est le owner pour quel nft il approuve

    }
    // gets the approved address for a single nft
    function getApproved (uint256 tokenId) public view returns(address){
        require(_owners[tokenId] != address(0), "tokenID does not exist"); //regarde si le token id est pas un nft valide => s'il n'est pas assigné a qqn
        return _tokenApprovals[tokenId];

    }

    // transfers ownership of an NFT
    function transferFrom(address from, address to, uint256 tokenId) public{
        address owner = ownerOf(tokenId) ;
        require(
            msg.sender == owner || 
            getApproved(tokenId) == msg.sender ||
            isApprovedForAll(owner, msg.sender),
            "msg.sender is not the owner or approved for transfer"

        );  

        require(owner == from, "from address is not the owner");
        require(to != address(0), "address is zero");
        require(_owners[tokenId] != address(0), "tokenId does not exist");


        //il faut supprimer les autorisation du from sur le nft 
        approve(address(0),tokenId);

        _balances[from] -= 1;
        _balances[to] += 1 ;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);

    }

    // standart trasnferForm
    //check if onERC741received is implementend when sending to smart contract
    //regarde si le smart contract est capable de reçevoir le nft
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public{
        transferFrom(from, to, tokenId);
        require(_checkOnERC721Received(),"Receiver not implemented");


    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public{
        safeTransferFrom(from, to, tokenId, "");
    }

    //oversimplified => on simplifie ici, normalement on regarde si le smart contract est sur ERC 721 et regarde la réponse
    function _checkOnERC721Received() private pure returns(bool){
        return true ;
    }

    // AIP165 : querry if a contract implements another interface => peut appeller cette fonction si un autre smart contract a la fonction qu'on recherche
    //returne true ou false si une interface id est implémenté
    //sans ça nos nft ne serots pas visible publiquement sur opensea

    

    function supportsInterface(bytes4 interfaceId) public pure virtual returns(bool) {
        return interfaceId == 0x80ac58cd;//check si l'interface egale ça  (voir dans la documentation /!\ important)
    }   
    
   
   

}