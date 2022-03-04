import React, { Component } from 'react';
import { Flex, Box } from "@chakra-ui/react";
import SocialHallLayout from './SocialHallLayout';
import SocialHallContent from './SocialHallContent';

function Content() {
    return (
        <Box
            w="80%"
            ml="3%"   
            position="relative"     
        >
            <SocialHallContent />            
        </Box>
    );
}

class SocialHallMain extends Component {
    
    render() {
        return (
                <Box
                    backgroundColor="gray.300"
                    h="100%"
                    w="100%"                   
                    position="fixed"
                    overflow="auto"
                >
                    <Flex
                        mt="3%"
                        ml="15%"
                        h="100%"
                        w="70%"  
                        position="relative"
                    >
                        <Box
                            w="20%"                           
                        >
                            <SocialHallLayout />
                               
                        </Box>
                        <Content />
                    </Flex>
                </Box>
               
        );
    }
}


export default SocialHallMain; 