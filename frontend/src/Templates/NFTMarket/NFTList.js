import React, { useState, useEffect } from "react";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import NFTTitleBlock from "./NFTTitleBlock";

function NFTList(props) {
    const [result, setResult] = useState([]);
    const topic = props.topic ;     

    //目前NFT分類狀態
    const status = props.status[0] && props.status[1] ? 0 : props.status[0] ? 1 : props.status[1] ? 2 : 3 ;     

    const url = 'http://192.168.31.7:8000/api/nft_title/?topic=' + topic + '&status=' + status;
    
    useEffect(() => {
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(res => {                           
                setResult(res);
            })
    }, [topic,status])
    return (
        <SimpleGrid
                bg="gray.400"               
                w="98%"
                h="100%"
                columns={[null,4]}                
            >
                {result.length == 0 ? <Text fontSize="4xl" align = "center"> Empty </Text> : ""}
                {
                    result === null ? "" :
                        result.map((res, index) => {
                            return <Box w="350px" h="380px">
                                <NFTTitleBlock key={index} content={res} />
                            </Box>
                        })
                }
        </SimpleGrid>
        
    );
}

export default NFTList

