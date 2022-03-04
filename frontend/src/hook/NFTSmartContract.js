import { useContractCall,useContractFunction,useSendTransaction } from "@usedapp/core";
import { ethers } from "ethers";
import Web3 from "web3";
import { of} from 'rxjs';
import ABI from 'web3-eth-abi';
import { Contract  } from "@ethersproject/contracts";
import  NFTJSON  from "../SmartContract/build/contracts/NFTProduct.json" ; 


const NFTABI = NFTJSON["abi"] ; // ABI
const NFTAddress = NFTJSON["networks"]["5777"]["address"]; //智能合約位置
const NFTInterface = new ethers.utils.Interface(NFTABI) ; // Interface 實做
const NFTContract = new Contract(NFTAddress , NFTInterface); // Contract 
// const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); 
const web3 = new Web3(window.web3.currentProvider); 


export function GetWeb3(){
    return web3
}

// 使用智能合約方法
export function useContractMethod(name){
    const { state , send } = useContractFunction(NFTContract, name , {transactionName : name });
    return { state , send } ; 
}

// NFT智能合約
export function useNFTMethod(name){
    const { state , send } = useContractFunction(NFTContract, name,
        {transactionName : name , value : 10*10**18} );
    return { state , send } ; 
}


// 解析指定 num 區塊的直 ajax promise 
export function getBlock( num , boolean ){
    return new web3.eth.getBlock(num , boolean) ; 
}

//返回指定address 到 blocknumber 交易數量 ajax promise 
export function getTransactionCount(addr , blockNumber){
    return new web3.eth.getTransactionCount(addr , blockNumber);
}

//返回當前block數 ajax promise 
export function getBlockNumber(){    
    return web3.eth.getBlockNumber();
}

// 呼叫合約
export function getContract() {
    return new web3.eth.Contract(NFTABI, NFTAddress);
}
// 取得 log 資訊
export function getReceipt(txHash) {
    return (web3.eth.getTransactionReceipt(txHash));
}

//發送交易
export function SendTransaction(FromAddr , ToAddr , value ){
    web3.eth.sendTransaction({
        from :　FromAddr,
        to : ToAddr,
        value : value
    }).then(function(receipt){
        console.log(receipt)
    })
}

// ABI 解碼
export function decodeLog(eventName, receipt) {
    const abi = NFTABI.find(item => item.name === eventName && item.type === 'event')
    const inputs = abi.inputs;
    const logs = receipt.logs;

    // rxjs 非同步回傳
    return of(ABI.decodeLog(inputs, logs[0].data, logs[0].topics));
}

// 取得事件
export function CallEvent(){
    const contract = getContract(); // 取得合約
    // 從第0個Block 開始找尋
    const eventOption = {
        fromBlock: 0
    }
    // 取得事件     
    const event = contract.getPastEvents('Success' , eventOption );    
    return (event);
}

