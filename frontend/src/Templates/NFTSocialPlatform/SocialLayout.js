import React , {useContext , useState, useEffect } from "react";
import { Text, Box, Image , Flex } from "@chakra-ui/react";
import { getContract } from "../../hook/NFTSmartContract";
import { InitContext } from "../../App";

function SocialLayout() {
    const context_val = useContext(InitContext);
    const [res , SetResult ] = useState([]);
    const contract = getContract();
    const eventOption = { fromBlock : 0 };
   
    useEffect(async()=>{
        if (context_val.page === 1 ){
            const event = await contract.getPastEvents('Success', eventOption);
            let table = [];
            for(let i =0; i< event.length ; i++){
                const val = event[i].returnValues; // 合約回傳的emit
                table.push(val)
            }
    
            SetResult(table);
        }
     
    },[context_val.page])
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
                {
                    res.map((res , index )=>{
                        return <NFTBlock content = {res} />
                    })
                }
            </Flex>
        </Box>
    );
}

function NFTBlock(props){
    const content = props.content;     
    const context_val = useContext(InitContext);

    return (
        <Box 
            m="3%"           
            cursor = "pointer"
            onClick={()=> { context_val.SetVal(content)}}
        >
            <Image boxSize="150px" borderRadius="3xl" src = {content.IpfsHash} />
        </Box>
    );
}
export default SocialLayout; 