/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Box , Text } from "@chakra-ui/react";
import Member_block from "./Member_block" ;


function Content_member(props){
    const creator = props.creator ;    

    return(
        <Box 
            h = "100%" 
            w = "100%" 
            bg = "gray.800"
        >
            <Box 
                h = "5%" 
                w = "100%" 
                bg="gray.600"                
            >
                <Text 
                    color="white" 
                    p="3" pt="3" 
                    fontSize="2xl" 
                    ml="20%"
                > Member </Text>                
            </Box>
            <Box
                w = "100%"
                h = "95%"            
            >
                <Member_block creator = { creator } />
            </Box>
        </Box>
    );
}


export default Content_member