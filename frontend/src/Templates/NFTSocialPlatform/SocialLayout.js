import React , {useContext , useState, useEffect } from "react";
import { Text, Box, Image , Flex } from "@chakra-ui/react";
import { InitContext } from "../../App";
import { useHistory } from "react-router-dom";

function SocialLayout() {
    const context_val = useContext(InitContext);
    const [data , SetData ] = useState(null);

    useEffect(()=>{            
        SetData(context_val.layoutdata);           
    },[context_val.layoutdata])
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
            <Flex
                bg="gray.900"
                w="100%"
                h="95%"   
                ml="1%"                  
                flexDirection="column"         
                align="center"
            >
                { data === null   ? "" :                
                    <NFTBlock content = {data} />                    
                }
            </Flex>
        </Box>
    );
}

function NFTBlock(props){
    const content = props.content;   
    const path = "/NFTSocial/Community/" + content.id ;
    const url = useHistory();
    return (
        <Box 
            m="3%"           
            cursor = "pointer"    
            onClick={()=>{ url.push(path) }}
        >
            <Image boxSize="150px" borderRadius="3xl" src = {content.ipfs} /> 
        </Box>
    );
}
export default SocialLayout; 