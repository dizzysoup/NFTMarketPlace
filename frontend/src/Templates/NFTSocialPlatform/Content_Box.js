/* eslint-disable react/jsx-pascal-case */
import React, { useState, useContext, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { Box, Flex, Input, Text, Spacer } from "@chakra-ui/react";
import { InitContext } from "../../App";
import AddressIcon from "../../Components/AddressIcon";


function ResponceBlock(props) {
    const content = props.content
    return (
        <Box mt="2%" ml="2%" w="100%">
            <Flex p="1%">
                <AddressIcon diameter={50} address={content.member} />
                <Box ml="2%" w="100%">
                    <Flex alignItems="flex-end">
                        <Text fontWeight="bold" > {content.member.slice(0, 9)} </Text>
                        <Text ml="1%" > {content.date} </Text>
                    </Flex>
                    <Text mt="1%"> {content.content} </Text>
                </Box>
            </Flex>
            <hr />
        </Box>
    );
}

function Community() {
    const [result, SetResult] = useState([]);
    const context_val = useContext(InitContext);    
    useEffect(() => {
        const api = 'http://192.168.31.7:8000/api/communityplatform?id=' + context_val.val.ID;
        fetch(api, { method: 'GET' })
            .then(res => res.json())
            .then(res => SetResult(res))
    }, [context_val.reload]);
    return (
        <Flex h="100%" flexDirection="column" align="center" overflowY="auto" overflowX="hidden">
            {
                result.length === 0 ?
                    <>
                        <Spacer />
                        <Text fontSize="4xl" fontWeight="bold"> 歡迎來到 </Text>
                        <Text fontSize="4xl" fontWeight="bold"> {context_val.val.Name} </Text>
                    </> :
                    result.map((index, key) => {
                        return <ResponceBlock content={index} />
                    })
            }

        </Flex>
    );
}

function Content_Box() {
    const { ActiveWallect, account } = useEthers();
    const context_val = useContext(InitContext);

    const handleKeyDown = (event) => {
        if (event.code === 'Enter' && event.target.value !== "") {
            const val = event.target.value;
            const api = "http://192.168.31.7:8000/api/communityplatform"
            const data = {
                "id": context_val.val.ID,
                "content": val,
                "account": account,
            }
            fetch(api, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
                .then(res => {
                    event.target.value = "";
                    context_val.SetReLoad(context_val.reload + 1)
                })
                .catch(function (res) { console.log(res) })
        }
    }

    return (
        <Flex flexDirection="column" h="95%">
            <Box bg="gray.400">
                <Text fontSize="2xl" pt="2%" pl="5%" fontWeight="bold" color="white"> # 討論區大廳 </Text>
            </Box>
            <hr />
            <Community />
            <Box p="2%">
                <Input placeholder="傳送訊息到討論區大廳" color="black" size="md" onKeyDown={(e) => handleKeyDown(e)} />
            </Box>
        </Flex>
    );
}

export default Content_Box