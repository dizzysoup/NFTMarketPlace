import React from "react";
import { Text, Stack, Box } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import NFTIcon from "./NFTIcon";
import { useEthers } from "@usedapp/core";


function SocialLayout(props) {
    const { GetAccount, account } = useEthers();

    return (
        <Box
            w='10%'
            h='100%'
            bg="gray.300" >
            <Box
                h="4%"
                bg="gray.600"
                w="auto"
            >
                <Text color="white" pl="4" fontSize="2xl"> 0xCommunity </Text>
            </Box>
            <Box
                bg="gray.900"
                w="100%"
                h="95%"                
            >
                <Box
                    ml="1%"
                    mt="1%"
                >
                    <NFTIcon account={account} />
                </Box>
            </Box>
        </Box>
    );
}


export default SocialLayout; 