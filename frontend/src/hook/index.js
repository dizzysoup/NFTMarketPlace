import { useContractCall,useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";
import { Contract  } from "@ethersproject/contracts";
import SimpleContractJSON from "../SmartContract/build/contracts/SimpleContract.json" // 取得智能合約


const SimpleContractABI = SimpleContractJSON["abi"]; // 智能合約ABI


const SimpleContractaddress = SimpleContractJSON["networks"]["5777"]["address"]; // 智能合約位置

const abiInterface = new ethers.utils.Interface(SimpleContractABI);  // 使用Interface 實例 abi 
const contract = new Contract(SimpleContractaddress, abiInterface) ;  // 使用 Contract 將 address 跟 Interface 整合

// 使用智能合約方法
export function useContractMethod(name){
    const { state , send } = useContractFunction(contract, name , {transactionName : name });
    return { state , send } ; 
}

// 取值
export function GetValue() {
    const count = useContractCall({
        abi : abiInterface,
        address : SimpleContractaddress,
        method: "count",
        args: []
    }); 
    return count ;
}