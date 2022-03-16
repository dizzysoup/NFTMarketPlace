import React , {useRef } from "react";
import {  Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useContractMethod } from "../../hook/NFTSmartContract";
import { useEthers } from "@usedapp/core";
import { useHistory } from "react-router-dom";
import { create } from 'ipfs-http-client';

function DeployedNFTEvent(props) {
    const { state, send: deployedNFT } = useContractMethod("DeployedNFT");
    const { ConnectWallet, account } = useEthers();
    const history = useHistory();
    const toast = useToast();
    const toastIdRef = useRef();

    const value = props.value;
    
    let ipfshash = "";

    function deployed(value) {            
        if (Boolean(value.img_array) === true && Boolean(value.title) === true && Boolean(value.royalties) === true
            && Boolean(value.price) === true) {            
            const data = value.img_array;           
            const ipfs = create({
                host: 'localhost',
                port: '5001',
                protocol: 'http'  
            });
            ipfs.add(data)
                .then(function(res){
                    ipfshash = 'https://ipfs.io/ipfs/' + res.path ;
                    Call();
                    
            })        
        }
      
    }
    
    function InsertInTransaction(){
        const price = value.price ; 
        const connstr = "http://192.168.31.7:8000/api/trans" ;
        const postdata = {
            "event" : "Minted",
            "price" : price, 
            "fromhash" : "SmartContract" , 
            "tohash" :  account
        }
        fetch(connstr, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(postdata)
        })
            .then(function (res) { 
                toastIdRef.current = toast({ 
                    status : 'success',
                    description: 'Deployed Success!!'             
                })
                history.push('/MarketPage');
            })
            .catch(function (res) { console.log(res) })    
    }
     
    async function Call() {
        const price = value.price;
        const num = value.number;
        const topic = value.topic;
        const description = value.description;       
        const link = value.link;
        const title = value.title;
        const royalties = value.royalties;  
        const number = value.number ;      
       
        await deployedNFT(title, num, price, topic , royalties, ipfshash, description, link); // 上鏈
        // 存入資料庫中
        const connstr = "http://192.168.31.7:8000/api/nft";

        const postdata = {
            "title": title,
            "creator": account,
            "topic": topic,
            "ipfs": ipfshash,
            "description": description,
            "price": price,
            "number" : number
        }
        fetch(connstr, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(postdata)
        })
            .then(function (res) { InsertInTransaction();  })
            .catch(function (res) { console.log(res) })    
    }

 
    return (
        <div>
            <Button
                mt="2%"
                w="100%"
                onClick={() => {
                    deployed(value)

                }}
            > Deployed  </Button>
        </div>
    );
}


export default DeployedNFTEvent;