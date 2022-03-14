import React from "react";
import { Text, Box, Image, Flex } from "@chakra-ui/react";


function CollectionCreatorList(props) {
    const content = props.content;
    return (
        <Box align="left" >
            <Flex>
                <Image boxSize="300px" src={content.IpfsHash} />
                <Box ml="1%" mr="1%" w="100%">
                    <Text fontSize="5xl"> {content.Title} </Text>
                    <Text fontSize="2xl" color="gray.700" align="center"> History </Text>
                    <Box mt="2%" w="100%" h="190px"                        
                        borderRadius= "1xl"    
                        borderWidth= "medium"
                        borderColor="gray.600"
                    >
                        No Transaction
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}


export default CollectionCreatorList