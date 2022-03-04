import React, { useContext } from 'react';
import { Box, Text, Input, Textarea, Button, Image, Flex, Spacer } from "@chakra-ui/react";
import { InitContext } from '../../App';
import { useEthers } from "@usedapp/core";
import AddressIcon from '../../Components/AddressIcon';



function BtnClick(title, content, account, datestr, topic) {
    const postdata = {
        "title": title,
        "releasehash": account,
        "content": content,
        "date": datestr,
        "classification": topic
    }
    const url = "http://192.168.31.7:8000/api/socialhall"
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(postdata)
    })
        .then(console.log(url + "post success !! "))
        .catch(function (res) { console.log(res) })
}

function SocialHallPostPage(props) {
    const { ConnectWallet, account } = useEthers();
    const topic = props.topic;
    const contextData = useContext(InitContext);
    const date = new Date();
    const datestr = date.getFullYear() + "/" + date.getMonth() + 1 + "/" + date.getDate() +
        (date.getHours > 12 ? " 上午 " : " 下午 ") + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + ":"
        + (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes());

    let title = "";
    let content = "";

    return (
        <Box h="100%" w="95%">
            <Text fontSize="3xl"> 發表新文章 </Text>
            <hr style={{
                backgroundColor: "black",
                height: 2,
                width: "100%"
            }} />
            <Flex mt="1.5%" ml="2%">
                <Box>
                    <AddressIcon diameter={60} address={account} />
                    <Text> {account.slice(0, 6)} </Text>
                </Box>
                <Box w="100%" ml="2%">
                    <Text mt="1%" fontSize="1xl" ml="1%"> {datestr}</Text>
                    <Box
                        w="10%"
                        bg="blue.300"
                        mt="1%"
                        pl="2%"
                        borderRadius="2xl"
                    >
                        <Text fontSize="1xl"> {topic}</Text>
                    </Box>
                </Box>
            </Flex>

            <Input
                type="text"
                mt="2%"
                placeholder="請輸入文章標題"
                borderColor="gray.900"
                w="100%"
                isRequired="true"
                onChange={event => title = event.target.value}
            />
            <Textarea
                type="text"
                mt="2%"
                placeholder="文章內容"
                borderColor="gray.900"
                w="100%"
                h="50%"
                lineHeight="2em"
                isRequired="true"
                onChange={event => content = event.target.value}
            />
            <Flex
                mt="2%"
                mr="2%"
            >
                <Spacer />
                <Button bg="gray.300"
                    mr="5%"
                    onClick={() => contextData.SetPost(-1)}
                > 取消 </Button>
                <Button bg="blue.300"
                    onClick={() => { BtnClick(title, content, account, datestr, topic); contextData.SetPost(-1); }}
                > 發布 </Button>
            </Flex>
        </Box>
    );
}

export default SocialHallPostPage