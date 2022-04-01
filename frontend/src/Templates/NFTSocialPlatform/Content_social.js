/* eslint-disable react/jsx-pascal-case */
import React  from "react"
import { Text, Box, Flex } from "@chakra-ui/react";
import Content_Box from "./Content_Box";
import AddressIcon from "../../Components/AddressIcon";
import Content_member from "./Content_member";


var title = [];
function CreatorTitle(props) {
    if (props.address.toString() === "home") {
        title = (
            <Text fontSize="5xl" mt="6%" ml="5%">
                You Haven't Enter SocialRoom
            </Text>
        );
    }
    else {
        title = (
            <Flex>
                <Box
                    m="3"
                    border="5px solid"
                    w="10%"
                    h="50%"
                    p="1.5%"
                >
                    <AddressIcon address={props.address} diameter={100} />
                </Box>
                <Box w="90%" >
                    <Flex mt="4%">
                        <Text
                            fontSize="5xl" > Welcome To  </Text>
                        <Text ml="1%" fontSize="5xl" color="red.500"> {props.address.toString().slice(0, 6)} </Text>
                        <Text ml="1%" fontSize="5xl"> Social Room   </Text>
                    </Flex>
                    <Text fontSize="4xl"> NFT Items : </Text>
                </Box>
            </Flex>
        )
    }

    return title;
}

function Content_social(props) {
    const address = props.match.params.address;
    return (
        <Flex
            bg="red.600"
            w="100%"
            h="100%"            
        >
            <Box
                w='80%'
                h='100%'
                bg='gray.400'
            >
                <Box
                    mt="1%"
                    border="5px solid"
                    borderColor="gray.300"
                    borderRadius="5px"
                    ml="5%"
                    h="30%"
                    w="90%"
                >
                    <CreatorTitle address={address} />
                </Box>             
              
                <Box 
                    w = "95%" 
                    h = "60%"                    
                    ml ="1%"
                >
                    <Content_Box creator={address} />
                </Box>              
            </Box>
            <Box w="20%" h="100%" bg="gray.300">
                <Content_member creator = { address } />
            </Box>
        </Flex>

    );

}

export default Content_social;