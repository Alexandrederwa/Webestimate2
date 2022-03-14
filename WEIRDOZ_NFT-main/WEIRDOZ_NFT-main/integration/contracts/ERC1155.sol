pragma solidity ^0.8.2;

contract ERC1155{




    event TransferSingle( address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _value);
    event TransferBatch( address  _operator, address  _from, address  _to, uint256[] _ids, uint256[] _values);

    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
    // event URI()

    //mapping from tokenID to account balance => donne le token id et le useradress et retourne la balance du token pour un copte
    mapping(uint256 =>mapping(address => uint256)) internal _balances ;

    //mapping from account to operator approvals => donne l'addresse de l'owner(1) et de l'opperateur(2), retourne vrai ou faux
    mapping(address=> mapping(address => bool)) private _operatorApprovals; 



    //gets the balance of an account tokens
    function balanceOf(address account, uint256 id)public view returns(uint256){
        require(account != address(0), "address is zero");
        return _balances[id][account];

    }

    //gets the balance of multiple account tokens (pluieurs compte)
    function balanceOfBatch(address[] memory accounts, uint256[] memory ids)public view returns(uint256[] memory){
        
        require(accounts.length == ids.length, "Account and ids are not the same length")  ; //ls 2 doivent avoir la même longueur
        uint256[] memory batchBalances = new uint256[](accounts.length); //créer un array pour es multiples comptes de taille accounts.length (mm taille que celui donné)
        for(uint256 i = 0 ; i < accounts.length; i++){                  // boucle qui permet de parcourir l'array donné
            batchBalances[i] = balanceOf( accounts[i], ids[i]) ;
        }   
        return batchBalances ;

    }


    // checks if an adress is an opperator for an other address
    function isApprovedForAll(address account, address operator) public view returns(bool){
        return _operatorApprovals[account][operator] ;


    }
    // Enables or disables an operator to manage all of msg.sender assets
    function setApprovalForAll(address operator, bool approved) public{

        _operatorApprovals[msg.sender][operator] = approved ; //seul le owner peut appeler cette fonction (donc on met msg.sender)
        emit ApprovalForAll(msg.sender, operator, approved);

    }
   
    //fonction de tranfert non sécurisée
    function _transfer(address from, address to, uint256 id, uint256 amount) private{ //amount = nbre de copie
        uint256 fromBalance = _balances[id][from]; // le nbre de copie qu'il a du nft
        require(fromBalance >= amount, "Insufficient balance");
        _balances[id][from] = fromBalance - amount ; // retire le nbre de copie qu'il envoie
        _balances[id][to] += amount ;
    }


    function safeTransferFrom(address from, address to, uint256 id, uint256 amount)public virtual{ //
        require(from == msg.sender || isApprovedForAll(from, msg.sender), "msgsender is not the owner or not approved for the transfert");
        require(to != address(0),"address is zero" );

        _transfer(from, to, id, amount);
        emit TransferSingle(msg.sender, from, to, id, amount);

        //voir si le jeton a été reçu => rendre + safe
        require(_checkOnERC1155Received(), "Received is not implemented");


    }
    function _checkOnERC1155Received() private pure returns(bool){
        //fonctionne pas vraiment
        return true ; //ici on implémente pas vraiment, il faut faire appel a une librairie externe 
    }

// si veut ssécure : function safeBatchTransferFrom(address from, address to, uint256[] memory ids, uitn256[] memory amounts, bytes memory data) 
    function safeBatchTransferFrom(address from, address to, uint256[] memory ids, uint256[] memory amounts) public{
        require(from == msg.sender || isApprovedForAll(from, msg.sender), "msgsender is not the owner or not approved for the transfert");
        require(to != address(0),"address is zero" );
        require(ids.length == amounts.length,"ids and amount are not the same");

        for( uint256 i = 0 ; i < ids.length; i++) {
            uint256 id = ids[i] ;
            uint256 amount = amounts[i]; 

            _transfer(from, to, id, amount);
        }

        emit TransferBatch(msg.sender, from, to, ids, amounts);
        require(_checkOnBatchERC1155Received(), "Received is not implemented");

    }
    function _checkOnBatchERC1155Received() private pure returns(bool){
        //fonctionne pas vraiment
        return true ; //ici on implémente pas vraiment, il faut faire appel a une librairie externe 
    }

    // ERC165 compliant 
    // tell everyone thah we support the ERC1155 function 
    // use sepecia code : interfaceId == 0xd9b67a26 (dans la documentation)
    //pour visualiser sur opensea
    function supportsInterface(bytes4 interfaceId) public pure virtual returns(bool){
        return interfaceId == 0xd9b67a26; // si égale, returne true

    }

}