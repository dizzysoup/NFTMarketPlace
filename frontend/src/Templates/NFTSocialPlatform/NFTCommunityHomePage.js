import React, { useState, useContext, useEffect } from "react";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { InitContext } from "../../App";
import { getContract } from "../../hook/NFTSmartContract";
import QRCode from 'qrcode.react';

const boxstyle = {
    bg: "gray.800",
    w: "80%",
    h: "80%",
    borderRadius: "3xl",
    borderColor: "gray.300",
    borderWidth: "4px",
    borderStyle: "solid",
    pl: "5%"
}

// 0xCommunity 主要頁面
function NFTCommunityHomePage() {
    const context_val = useContext(InitContext);
    const [pages, SetPages] = useState([]);

    useEffect(() => {
        if (context_val.page != 0)
            SetPages(<QRLoginBlock />)
        else
            SetPages(<WelcomeBlock />);

    }, [context_val.val])

    return (
        <Flex
            w="100%"
            h="100%"
            bg="gray.700"
            justifyContent="center"
            align="center"
        >
            {pages}
        </Flex>
    );
}

// 0xCommunity 歡迎頁面
function WelcomeBlock() {
    return (
        <Box {...boxstyle}>
            <Box>
                <Text
                    fontSize="9xl"
                    color="gray.300"
                >
                    Welcome  </Text>
                <Text
                    fontSize="9xl"
                    color="gray.300"
                > 0xCommunity  </Text>
            </Box>

            <Box>
                <Text color="gray.300"
                    fontSize="3xl"
                > NFT Community </Text>
                <Text color="gray.300"> 進入 NFT 專屬社群</Text>
                <Button
                    mt="1%"
                    color="blue.400"
                    fontSize="3xl"
                > 從區塊鏈讀取項目 </Button>
            </Box>
            <NFTProduct />
        </Box>

    );
}

// QRcode 驗證登入介面
function QRLoginBlock() {
    const context_val = useContext(InitContext);
    return (
        <Box {...boxstyle} >
            <Flex alignItems="center" w="100%" h="100%">
                <Image boxSize="350px" borderRadius="3xl" src={context_val.val.IpfsHash} />
                <Flex ml="5%" flexDirection="column" justifyContent="center" w="100%">
                    <Text color="white" fontSize="5xl"> Welcom to  "{context_val.val.Title}" Community !</Text>
                    <Flex p="3%" align="center">
                        <Box>
                            <Text color="white" fontSize="4xl"> Verify and Login : </Text>
                            <Text color="white" fontSize="1xl"> IpfsHash + MetaMask address  </Text>
                        </Box>
                        <Box ml="5%">
                            <QRCode
                                fgColor="#000000"
                                size={150}
                                value={context_val.val.IpfsHash}
                            />
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );

}

// NFT 項目從Blockchain 撈取
function NFTProduct() {
    const contract = getContract();
    const eventOption = { fromBlock: 0 };
    const [res, SetResult] = useState([]);
    useEffect(async () => {
        const event = await contract.getPastEvents('Success', eventOption);
        let table = [];
        for (let i = 0; i < event.length; i++) {
            const val = event[i].returnValues; // 合約回傳的val           
            table.push(val);
        }
        SetResult(table);
    }, [])
    return (
        <Flex>
            {
                res.map((res, index) => {
                    return <NFTBlock content={res} />
                })
            }
        </Flex>
    );
}

// NFT項目細節
function NFTBlock(props) {
    const context_val = useContext(InitContext);
    const content = props.content;

    return (
        <Box
            m="1%"
            cursor="pointer"
        >
            <Image boxSize="150px" borderRadius="3xl"
                onClick={() => {
                    context_val.ChangePage(1);
                    context_val.SetVal(content);
                }}
                src={content.IpfsHash} />
        </Box>
    );
}

export default NFTCommunityHomePage; 