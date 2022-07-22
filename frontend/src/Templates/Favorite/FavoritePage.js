import { Text , Box, SimpleGrid  } from "@chakra-ui/react";
import React,{ useEffect, useState , useContext } from "react";
import NFTTitleBlock from "../NFTMarket/NFTTitleBlock";
import { InitContext } from "../../App" ; 

function FavoritePage(props){
    const [result , SetResult ] = useState([]);

    const conxtdata = useContext(InitContext);

    const account = props.account ; 
    
    const url = "http://192.168.31.7:8000/api/favorite/?account=" + account ; 
    useEffect(()=> {
        fetch(url , {method:"GET"})
            .then(res => res.json())
            .then(res => {
                SetResult(res)
            })
    },[account,conxtdata.reload])

    return(
        <Box 
            w="100%" 
            h="100%"
            bg = "blue.800"
            mt = "2%"           
            align="center"
            p = "1%"
            position="fixed"
        >
            <Text fontSize="5xl" color="white" > Your Favorite Collection  </Text>
            { result.length == 0 ? <Text fontSize="4xl" color = "white" > 　Empty </Text> :　""}
            <SimpleGrid                
                ml = "1%"                
                boxSize="80%"
                align = "left"
                columns= {4}  
                p = "0.5%" 
            >
                {
                    result == null ? "":
                    result.map((res, index) => {
                        return <Box w = "270px" h = "320px">
                            <NFTTitleBlock key = {index}  content = {res} contextdata = { conxtdata }/>
                        </Box>
                    })
                }
            </SimpleGrid>
            
        </Box>
    );
} 



export default FavoritePage ; 