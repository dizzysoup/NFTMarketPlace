import React from 'react';
import { Box, Text } from "@chakra-ui/react";
import CollectionItem from './CollectionItem';
import CreatorCollection from './CreatorCollection';

const boxstyle = {
    w: "100%",
    h: "auto",
    bg: "gray.400",
    mt: "0.5%",    
    borderRadius: "3xl",    
    borderWidth: "medium",
    p: "2%"
}

function CollectionPage(props) {
    const account = props.account;
    return (
        <Box
            bg="gray.300"
            w="100%"
            h="100%"
            align="center"
            position="relative"
            mt="1.5%"
            overflow="auto-y"
            p = "2%"
        >
            <Box w = "80%" h="100%">
                <Text fontSize="4xl" align="left" > Your Minted NFT </Text>
                <Box {...boxstyle}>
                    <CreatorCollection account={account} />
                </Box>
                <Text fontSize="4xl" align="left" > Your Collection </Text>
                <Box {...boxstyle} >
                    <CollectionItem account={account} />
                </Box>
            </Box>
        </Box>
    );
}


export default CollectionPage;