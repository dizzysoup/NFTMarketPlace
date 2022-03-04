import React, { Component, useState, useEffect } from "react";
import { Text, Stack, Box, Link , Button  } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import NFTIcon from "./NFTIcon";
import { useEthers } from "@usedapp/core";


function SocialLayout(props){
    const { GetAccount ,account } = useEthers();   

    useEffect(() => {
        console.log(account)
    },[account])

    return(
        <BrowserRouter >
        <Stack direction={['column', 'row']} spacing="7.5%" >
            <Box
                position="fixed"
                w='50%' h='100%'>                          
                <Box 
                    h="5%" 
                    bg="gray.600" 
                    w="100%" 
                                           
                > 
                    <Text color="white" p="3" pt="3" fontSize="2xl"> Social Room  </Text>                                        
                </Box>
                <Box 
                    bg = "gray.900" 
                    w = "90%" 
                    h = "95%" 
                    position="fixed"
                >
                    <Box
                        ml = "1%"
                        mt = "1%"
                    >
                    <NFTIcon account={account} />
                    </Box>
                </Box>                                            
            </Box>
            {props.children}
        </Stack>
    </BrowserRouter>
    );
}


export default SocialLayout; 