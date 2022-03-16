import React, { useState, useEffect, useContext } from 'react';
import { Text, Box, Image, Button, SimpleGrid } from "@chakra-ui/react";
import { InitContext } from "../../App";
import { useEthers } from '@usedapp/core';
import { getContract } from "../../hook/NFTSmartContract";


function ResellCancle(nft_id, price, address) {
    const data = {
        nft_id: nft_id,
        price: price,
        address: address
    }
    const url = "http://192.168.31.7:8000/api/resell/";
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE",
        body: JSON.stringify(data)
    })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })

}

function ResellBtn(props) {
    const { active, account } = useEthers();
    const content = props.content;
    const contextdata = useContext(InitContext);
    const contract = getContract();
    console.log(content);

    // 上鏈 + 資料庫維護
    function ResellBuy(price, to, from, nft_id) {
        const data = {
            event: "Resell",
            creator : content.creator,
            price: price,
            fromaddress: from,
            to: to,
            nft_id: nft_id
        }        
        contract.methods.ResellNFT(data.fromaddress,data.creator, data.nft_id).send({
            from: account,
            to: data.fromaddress,
            value: price * 10 ** 18
        }, (err, res) => {
            if (res) {
                const url = "http://192.168.31.7:8000/api/resell"
                fetch(url, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "PUT",
                    body: JSON.stringify(data)
                })
                    .then(function (res) { console.log(res) })
                    .catch(function (res) { console.log(res) })
            }
        });
    }

    return (
        <Box w="300px" h="350px" bg="gray.300" p="1%" align="center" >
            <Image boxSize="65%" src={content.ipfs} />
            <Text fontSize="2xl" > {content.title} </Text>
            <Text fontSize="2xl" > Price :  {content.price} </Text>
            {account !== content.address ? <Button onClick={async() => {
                await ResellBuy(content.price, content.creator, content.address, content.id)
                contextdata.SetReLoad(contextdata.reload + 1)
            }}>
                Buy
            </Button> :
                <Button onClick={async() => {
                    await ResellCancle(content.id, content.price, content.address);
                    contextdata.SetReLoad(contextdata.reload + 1)
                }} > Cancle </Button>
            }

        </Box>
    );
}

function ResellNowSell(props) {
    const [result, SetResult] = useState([]);
    const account = props.account
    const url = "http://192.168.31.7:8000/api/resell/?address=" + account;
    const contextdata = useContext(InitContext);
    useEffect(() => {
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(res => {
                SetResult(res)
            })
    }, [contextdata.reload])
    return (<Box p="5%" w="100%" h="auto" >
        <SimpleGrid columns={4} spacing={10}>
            {
                result.length === 0 ? "" :
                    result.map((res, index) => {
                        return <ResellBtn content={res} key={index} />
                    })
            }
        </SimpleGrid>
    </Box>)
}


export default ResellNowSell; 