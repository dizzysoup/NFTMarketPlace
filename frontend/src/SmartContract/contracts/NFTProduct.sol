pragma solidity ^0.8.0;


contract NFTProduct {
    int128 public ID;  
    uint256 public Price; 
    int128 public Num ; 
    address public CreateHash;
    address public UserHash ; 
    string public ArtWorkType ; 
    string public Description ;
    string public Ipfshash ;
    string public Link ;
    string public Title ;   
    int16 public Royalties ; 
    

    constructor(){
        CreateHash = msg.sender ;
    }


    function DeployedNFT(string memory _title , uint256 _price , int128 _num , string memory _type , int16 _roy ,string memory _ipfs , string memory _des  , string memory _lik )  public   
    {
        ID ++ ; 
        CreateHash = msg.sender ; 
        Price = _price ; 
        Num = _num ; 
        Title = _title; 
        ArtWorkType = _type ;
        Royalties = _roy ;      
        Ipfshash = _ipfs ; 
        Description = _des ; 
        Link = _lik ; 
        emit Success(ID, msg.sender, _price ,_num, _title , _type , _roy ,_ipfs , _des , _lik );
    }

    function BuyNFT(address payable _creator, string memory _ipfs , uint256 _price, int128 _id  ) payable  public {    
        UserHash = msg.sender ;  
        emit BuySuccess(msg.sender,_creator , _ipfs , _price , _id );
    }

    
    event BuySuccess(
        address user,
        address creater,
        string _ipfs ,
        uint _price,
        int128 _id 
    );
    
    event Success(
       int128 ID, 
       address CreateHash ,
       uint256 Price, 
       int128 Num , 
       string Title,
       string ArtWorkType,
       int16 Royalties, 
       string IpfsHash,
       string Description,
       string Link
    );

}