import React, { useState, useEffect, useContext } from 'react';
import { Text, Box, Image, Flex, Button, SimpleGrid } from "@chakra-ui/react";
import { InitContext } from "../../App" ;
import { useEthers } from '@usedapp/core';

function ResellCancle(nft_id, price, address) {
    const data = {
        nft_id: nft_id,
        price: price,
        address: address
    }
    const url = "http://192.168.31.7:8000/api/resell/" ;
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
    const { active , account } = useEthers();

    const content = props.content;
    const contextdata = useContext(InitContext);
    return (
        <Box w="300px" h="300px" bg="gray.300" p="1%" align="center" >
            <Image boxSize="70%" src={content.ipfs} />
            <Flex w="300px" ml="20%" >
                <Text fontSize="3xl" > {content.title} </Text>
                <Text fontSize="3xl" ml="3%"> Price :  {content.price} </Text>
            </Flex>
            { account !== content.address  ? "" : 
              <Button onClick={() => {
                ResellCancle(content.id, content.price, content.address);
                contextdata.SetReLoad( contextdata.reload + 1 )
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
    return (<Box p="5%" w = "100%" h = "auto" >
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