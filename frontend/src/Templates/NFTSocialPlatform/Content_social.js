/* eslint-disable react/jsx-pascal-case */
import React, { useContext } from "react"
import { InitContext } from "../../App";
import { Text, Box, Flex, Spacer } from "@chakra-ui/react";
import Content_Box from "./Content_Box";
import AddressIcon from "../../Components/AddressIcon";
import Content_member from "./Content_member";
import { useEthers } from "@usedapp/core";

function TopicLayout() {
    const context_val = useContext(InitContext);
    const data = context_val.val;
    const { avtiveWallect , account } = useEthers();
    return (
        <Flex
            bg="gray.600"
            h="94%"
            w="250px"
            flexDirection="column"
        >
            <Box p="5%" color="white" fontWeight="bold" fontSize="2xl" >  {data.Name}  </Box>
            <hr />
            <Text color="gray.100" p="5%"> STAGE </Text>
            <Box pt="3%" pl="6%" bg="gray.500" >
                <Text color="gray.100" > # 討論區大廳</Text>
            </Box>
            <Spacer />
            <Flex color="white" h="50px" bg = "gray.700" p ="5%" fontWeight="bold" align = "center" > 
                <AddressIcon diameter = {30} address = {account}  />
                <Text ml = "5%" >{ account.slice(0,9) } </Text>
            </Flex>
        </Flex>
    );
}


function Content_social() {
    return (
        <Flex            
            w="100%"
            h="100%"
        >
            <TopicLayout />   
            <Box
                w='80%'
                h='100%'
                bg='gray.400'
            >                
                <Content_Box />              
            </Box>
            <Box w="20%" h="100%">
                <Content_member />
            </Box>
        </Flex>

    );

}

export default Content_social;