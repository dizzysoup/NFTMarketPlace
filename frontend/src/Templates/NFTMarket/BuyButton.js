import React , { useRef } from "react";
import { Button } from "@chakra-ui/react";
import { getContract } from "../../hook/NFTSmartContract";
import { useEthers } from "@usedapp/core";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export default function BuyButton(val){
    const { ConnectWallet , account } = useEthers();
    const contract = getContract(); // 取得contract 
    const connstr = "http://192.168.31.7:8000/api/trans" ; 
    const history = useHistory();

    const accountlist = "/AccountPage/Collection/" + account ; 
   
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

    function Buy(){             
        contract.methods.BuyNFT(val.creator , val.ipfsHash , val.price , val.id).send({
            from : account ,
            to: val.creator,
            value : val.price*10**18
        }, (err ,res )=> {            
            if(res){
                fetch(connstr , {
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
                })
                .then( res => {
                    history.push(accountlist)
                })
            };
        })
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