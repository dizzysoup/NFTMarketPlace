import {getContract,getBlock,getTransaction } from "../../hook/NFTSmartContract";

async  function NFTLoginCheck(hash,account){
    const contract = getContract();
    const eventOption = { fromBlock: 0 };
    //會員驗證
    const event = await contract.getPastEvents('BuySuccess', eventOption);
    let res = 0 ;
    for(let i = 0; i < event.length; i++){
        const val = event[i].returnValues; // 合約回傳的val  
        const block = await getBlock(event[i].blockNumber);
        const trans = await getTransaction(block.transactions[0]); //取得交易資訊
        
        if(trans.from === account && hash === val._hash){
            res = 1 ;
            break ;
        }
    }
    //創作者驗證
    const event2 = await contract.getPastEvents('Success', eventOption);
    for(let i = 0 ; i< event2.length ; i++){
        const val = event2[i].returnValues; // 合約回傳得val        
        const creator  = val.CreateHash;
        if(hash === val.Hash && account === creator){
            res = 2;
            break;
        }
    }

    if(res===0) res = -1 ;
    return  res ; 

}

export default NFTLoginCheck