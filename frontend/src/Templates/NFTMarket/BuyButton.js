import React , { useRef , useContext} from "react";
import { Button } from "@chakra-ui/react";
import { getContract } from "../../hook/NFTSmartContract";
import { useEthers } from "@usedapp/core";
import { useToast } from "@chakra-ui/react";
import {InitContext } from "../../App" ;
import sha256 from "../../Components/CreateHash";

// 故意等待秒數 
async function wait(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
};

export default function BuyButton(val){
    const { ConnectWallet , account } = useEthers();
    const contract = getContract(); // 取得contract 
    const connstr = "http://192.168.31.7:8000/api/trans" ;      
    const context_val = useContext(InitContext); 
    const toast = useToast();
    const toastIdRef = useRef();
    const number = val.sale ; 

    const data = {
        "event" : 'sale',
        "fromhash" : val.creator,       
        "tohash" : account,
        "price" : val.price,
        "id" : val.id
    }

    async function Buy(){
        
        context_val.SetStatus(true);
        await wait(2000);
        const hash = sha256(val.ipfsHash+account); // 加密
        context_val.SetVal(30); //進度條推進
        await wait(2000);
        const res =  await contract.methods.BuyNFT(val.creator , val.ipfsHash , val.price , val.id,hash).send({
            from : account ,
            to: val.creator,
            value : val.price*10**18
        })
        if(res){
            context_val.SetVal(70);
            await wait(2000);
            // 插入資料表
            await fetch(connstr , {
                method : 'POST',
                headers: { 
                    "Content-Type": "application/json ",
                    "Accept": "application/json" 
                },
                body :  JSON.stringify(data)
            })
            const url = "http://192.168.31.7:8000/api/collection"
            const postdata = {
                "id" : val.id,
                "address" : account
            }
            fetch(url ,{
                method : 'POST',
                headers: { 
                    "Content-Type": "application/json ",
                    "Accept": "application/json" 
                },
                body : JSON.stringify(postdata)
            }).then( res => {
                context_val.SetVal(100);
                context_val.SetReLoad(context_val.reload + 1 )
            })
            await wait(1000);
            context_val.SetData(hash); // qrcode 生成          

        }

    }

    function Cancle(){
        toastIdRef.current = toast({ 
            status : 'error',
            description: '沒有嘞'             
        })
    }
    return(
        <div>
            <Button 
                onClick = { number == 0 ?  Cancle : Buy } 
                backgroundColor= { number == 0 ? "gray.600" : "blue.600"}
                mt = "3%"
                color =  "white"
                > Buy now  </Button>
        </div>
    );

}