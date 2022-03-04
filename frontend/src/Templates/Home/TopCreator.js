import React, { useState, useEffect } from "react";
import { Box, Button, Text, Textarea, Image, Flex, Spacer, border } from "@chakra-ui/react";
import AddressIcon from "../../Components/AddressIcon";
import { useHistory } from "react-router-dom";

function CreatorBlock(props) {
    const [ borderbg , SetBorder ] = useState(-1);
    const content = props.content;
    const history = useHistory();
    const link = "AccountPage/Collection/" + content.creator ;
    console.log(content);
    return (
        <Flex
            bg="gray.300" w="400px" mt="2%" p="2%"
            h="80px" ml="2%" 
            align="center"
            cursor = "pointer"            
            border =  { borderbg == 1 ? "3px solid red " : ""}
            onMouseEnter={()=> SetBorder(-borderbg)}
            onMouseLeave={()=> SetBorder(-borderbg)}   
            onClick = {() => history.push(link) }         
        >
            <Text fontSize="5xl"> {content.seq} </Text>
            <Box ml="5%" >
                {content.PFP == null ?
                    <AddressIcon address={content.creator} diameter={60} /> :
                    <Image borderRadius="full" w = "60px" h = "auto" src={content.PFP} />
                }
            </Box>
            <Text ml = "5%">
                {
                    content.name == null ? content.creator.slice(0,10) : content.name 
                }
            </Text>
        </Flex>
    );

}

function TopCreator() {
    const [result, SetResult] = useState([]);
    const url = "http://192.168.31.7:8000/api/top_creator";
    useEffect(() => {
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(res => SetResult(res))
    }, []);
    return (
        <Box ml="5%" >
            <Text fontSize="4xl" > Top 10  Creator  </Text>
            {
                result == [] ? "" :
                    result.map((res, index) => {
                        return <CreatorBlock key={index} content={res} />
                    })
            }
            
        </Box>
    );
}


export default TopCreator;