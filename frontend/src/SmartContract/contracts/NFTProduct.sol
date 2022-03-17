// SPDX-License-Identifier: MIT
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

    
    // 發布NFT
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
    
    // 購買NFT
    function BuyNFT(address payable _creator, string memory _ipfs , uint256 _price, int128 _id  ) payable  public {    
        payable(_creator).transfer(msg.value); // 向創作者轉帳
        emit BuySuccess(msg.sender,_creator , _ipfs , _price , _id );
    }

    // 轉賣NFT
    function ResellNFT(address payable from, address payable _creator , int128 _nftid , uint128 _roy) payable public {   
        payable(from).transfer(msg.value / 100 * (100 - _roy )); // 向轉賣者轉帳
        payable(_creator).transfer(msg.value / 100 * _roy ) ; // 創作者抽成
        emit ResellSuccess(msg.sender,_creator ,from , msg.value ,_nftid , _roy );
    }
    // 轉賣NFT 事件
    event ResellSuccess(
        address user ,
        address creator,
        address from ,        
        uint256 _price,
        int128 _id ,
        uint _roy
    );
    
    // 成功購買事件
    event BuySuccess(
        address user,
        address creater,
        string _ipfs ,
        uint _price,
        int128 _id 
    );
    // 發布成功事件
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