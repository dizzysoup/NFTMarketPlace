import React from 'react';
import { Box } from "@chakra-ui/react";
import CollectionItem from './CollectionItem';


function CollectionPage(props) {
    const account = props.account;
    return (
        <Box
            bg="gray.300"
            w="100%"
            h="100%"
            position="relative"
            mt="1.5%"
            overflow="auto-y"
            p="6%"
        >
            <Box
                w="80%"
                h="auto"
                bg="gray.400"
                mt="0.5%"
                ml="10%"
                borderRadius="3xl"
                borderColor="black"
                borderWidth="medium"
                p="2%"
            >
                <CollectionItem account = { account } />
            </Box>
        </Box>
    );
}


export default CollectionPage;