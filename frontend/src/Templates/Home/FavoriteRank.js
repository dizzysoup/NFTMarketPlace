import React, { useState, useEffect } from "react";
import { Box, Flex, Text , Image } from "@chakra-ui/react";
import heart from "../../Images/Icon/heart02.png" ; 
import { useHistory } from "react-router-dom";

function RankBlock(props) {
    const content = props.content;
    const rank = content.seq ; 
    const history = useHistory();
    const bgcolor = rank == 1 ? "yellow.300" : rank == 2 ? "gray.400" : "brown";    
    const path = "/assets/" + content.creator + "/" + content.id ; 
    return (
        <Box           
            ml = "5%"
            h = "100%"
            w = "30%"            
            bg = {bgcolor}
            p = "2%"
            cursor = "pointer"            
            onClick={()=> history.push(path)}
        >
            <Text fontSize="4xl"> Top  { rank }</Text>
            <Image src = {content.ipfs} />   
            <Flex w="50px" h="auto" mt="2%">
                    <Image src = {heart}  /> 
                    <Text fontSize="3xl" ml = "5%"> { content.count}</Text>
            </Flex>
        </Box>
    );
}



function FavoriteRank() {
    const [result, SetResult] = useState([])
    let index = 0 ; 
    const url = "http://192.168.31.7:8000/api/favorite_rank";
    useEffect(() => {
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(res => SetResult(res))
    }, [])

    return (
        <Box mt = "1%"  w = "50%" >
            <Text fontSize="4xl"> Top Favorite </Text>
            <Flex
                w="100%"
                mt = "3%"
                h= "400px"
                borderRadius="2xl"
                borderColor="black"     
                borderStyle="solid"   
                align = "left"                    
               
            >
                {
                    result == [] ? "" :
                        result.map((res, index ) => {                            
                            return <RankBlock key={index} content={res} />
                        })
                }
            </Flex>
        </Box>
    );

}

export default FavoriteRank; 