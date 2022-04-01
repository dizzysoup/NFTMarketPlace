import React, { useState, useContext, useEffect } from "react";
import { Box, Flex, Text, Button, HStack } from "@chakra-ui/react";
import { Collapse, useDisclosure } from "@chakra-ui/react";
import { InitContext } from "../../App";


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
        if (context_val.page == 0)
            SetPages(<WelcomeBlock context_val={context_val} />)
        else if (context_val.page == 1)
            SetPages(<CreatorBlock context_val={context_val} />)

    }, [context_val.page]);


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
function WelcomeBlock(props) {
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
            <HStack mt="5%" spacing="10%">
                <Box>
                    <Text color="gray.300"
                        fontSize="3xl"
                    > NFT創作者 </Text>
                    <Text color="gray.300"> 使用 NFT 創立專屬社群</Text>
                    <Button
                        mt="1%"
                        color="blue.400"
                        fontSize="3xl"
                        onClick={() => props.context_val.ChangePage(1)}
                    > 創立NFT Member Club </Button>
                </Box>
                <Box>
                    <Text color="gray.300" fontSize="3xl">
                        NFT 會員
                    </Text>
                    <Text color="gray.300"> 透過NFT驗證進入社群 </Text>
                    <Button
                        mt="1%"
                        color="red.400"
                        fontSize="3xl"
                    >
                        進入NFT社群
                    </Button>
                </Box>
            </HStack>
        </Box>

    );
}

// 0xCommunity 創作者創作 Community 頁面
function CreatorBlock(props) {
    const {isOpen , onToggle } = useDisclosure();

    return (
        <Box {...boxstyle}>
            <Box mt="5%">
                <HStack spacing="3%">
                    <Box>
                        <Text color="gray.300"
                            fontSize="3xl"
                        > NFT創作者 </Text>
                        <Text color="gray.300"> 使用 NFT 創立專屬社群</Text>
                    </Box>
                    <Box
                        bg="white"
                        p="0.5%"
                        mt="1%"
                        borderRadius="1xl"
                    >
                        <Text
                            color="blue.400"
                            fontSize="3xl"
                        > 創立NFT Member Club </Text>
                    </Box>
                </HStack>
            </Box>
            <Box mt="3%">
                <Flex >
                    <Text
                        fontSize="3xl"
                        color="gray.300"
                    >
                        選擇你的 NFT 鑄造成 NFT Member Card
                    </Text>
                    <Button ml = "0.5%" onClick={onToggle}> Select ! </Button>
                </Flex>
            </Box>
        
            <Collapse in = {isOpen}>
                <Box w = "95%" h = "100%" bg = "red" position="sticky">
                    <Text fontSize="3xl" color = "gray.300"> 123 </Text>
                </Box>
            </Collapse>
        </Box>
    );
}

export default NFTCommunityHomePage; 