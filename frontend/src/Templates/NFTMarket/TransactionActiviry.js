import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { getBlock, getContract } from "../../hook/NFTSmartContract";

function trans_table(event, price, from, to, date) {
    return (
        <Tr>
            <Td> {event}</Td>
            <Td> {price} </Td>
            <Td> {from}</Td>
            <Td> {to}</Td>
            <Td> {date} </Td>
        </Tr>
    );
}
// 發布事件擷取
async function DeployedEvent(props) {
    const contract = getContract();
    const eventOption = { fromBlock: 0 }
    const creator = props.creator;
    const no = props.no;
    const event = await contract.getPastEvents('Success', eventOption);
    let table = [];
    for (let i = 0; i < event.length; i++) {       
        const val = event[i].returnValues; // 合約回傳的emit
        const blocknumber = event[i].blockNumber; //所在的block 
        // 驗證
        if (val["ID"] == no && val["CreateHash"] == creator) {
            const block = await getBlock(blocknumber, true); //取得該區塊所有資訊    
            if (block.transactions[0] !== undefined) {
                const _date = new Date(block.timestamp * 1000);
                const date = _date.getFullYear() + " / " + (_date.getMonth() + 1) + " / " + (_date.getDate());
                table = trans_table("Minted", val["Price"], "SmartContract",creator, date);
            }
        }
    }
    return table
}

// 購買事件擷取
async function BuyEvent(props) {
    const contract = getContract();
    const eventOption = { fromBlock : 0 }
    const creator = props.creator ; 
    const no = props.no ; 
    const event = await contract.getPastEvents('BuySuccess', eventOption);
    let table = [] ; 
    for(let i = 0 ; i< event.length ; i++){
        const val = event[i].returnValues ; 
        const blocknumber = event[i].blockNumber; //所在的block       
        // 驗證
        if(val["_id"] == no ){
            const block = await getBlock(blocknumber, true); //取得該區塊所有資訊  
            if (block.transactions[0] !== undefined) {
                const _date = new Date(block.timestamp * 1000);
                const date = _date.getFullYear() + " / " + (_date.getMonth() + 1) + " / " + (_date.getDate());
                table.push(trans_table("Saled",  block.transactions[0].value / 10**18 , creator, val.user , date));
            }
        }
    }
    return table ; 
}

async function ResellCheck(props){
    const contract = getContract();
    const eventOption = { fromBlock : 0 }
    const event = await contract.getPastEvents('ResellSuccess', eventOption);
    let table = [];
    // 驗證
    for(let i = 0 ; i < event.length ; i++){
        const val = event[i].returnValues ; 
        const blocknumber = event[i].blockNumber; //所在的block     
        if(val["_id"] == props.no ){
            const block = await getBlock(blocknumber, true); //取得該區塊所有資訊  
            if (block.transactions[0] !== undefined) {
                const _date = new Date(block.timestamp * 1000);                
                const date = _date.getFullYear() + " / " + (_date.getMonth() + 1) + " / " + (_date.getDate());
                table.push(trans_table("ReSell",  block.transactions[0].value / 10**18 , val.from, val.user , date));
            }
        }  
    }
    return table ; 

}

function TransactionActitvity(props) {
    const [minted, setMinted] = useState(null);
    const [saled , setSaled ] = useState(null);
    const [resell , setResell ] = useState(null);

    useEffect(async() => {
        const mintedtable = await DeployedEvent(props);
        setMinted(mintedtable);
        const saledtable = await BuyEvent(props);
        setSaled(saledtable);
        const reselltable = await ResellCheck(props);
        setResell(reselltable);
    }, [])

    return (
        <Table size="md" >
            <Thead>
                <Tr>
                    <Th> Event </Th>
                    <Th> Price </Th>
                    <Th> From </Th>
                    <Th> To </Th>
                    <Th> Date </Th>
                </Tr>
            </Thead>
            <Tbody>
                {minted}
                {saled}
                {resell}
            </Tbody>
        </Table>
    );
}

export default TransactionActitvity;