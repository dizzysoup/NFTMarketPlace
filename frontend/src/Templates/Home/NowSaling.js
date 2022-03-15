import React, { useState, useEffect } from "react";
import { Text, Box, Image } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";



function SalingBlock(props) {
    const [hid, SetHidden] = useState(1);
    const content = props.content;
    const link = "/assets/" + content.creator + "/" + content.id;
    const history = useHistory();
    return (
        <Box w="500px" h="500px" >
            <Box                
                borderRadius="2xl"
                w="500px"
                position="absolute"
                cursor="pointer"
                p="2%"
                bg="brown"
                onMouseEnter={() => SetHidden(-hid)}
            >
                <Image w="500px" h="auto" src={content.ipfs} />
            </Box>
            <Box
                w="500px"
                h="500px"
                position="absolute"
                borderRadius="2xl"
                cursor="pointer"
                pl="3%"
                pt="2%"
                bg="blackAlpha.400"
                hidden={hid == 1 ? true : false}
                onMouseLeave={() => SetHidden(-hid)}
                onClick={() => history.push(link)}

            >
                <Text fontSize="5xl" color="white" > {content.title}</Text>
                <Text fontSize="2xl" color="white" > { content.creator == undefined ? "" : content.creator.slice(0, 6)}</Text>
                <Text fontSize="1xl" color="white" > {content.description} </Text>
            </Box>
        </Box>
    );
}

function NowSaling() {
    const [result, setResult] = useState(null);
    const topic = '';
    const url = 'http://192.168.31.7:8000/api/nft_title/?topic=' + topic + '&status=0'
    useEffect(() => {
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(res => {                
                setResult(res[0]);
            })
    }, [])

    return (
        <Box w = '30%' h = "auto" >
            <Text fontSize="4xl">
                New NFT !
            </Text>
            { result == null ? "" : <SalingBlock content={result} /> }    
        </Box>
    );
}

export default NowSaling
