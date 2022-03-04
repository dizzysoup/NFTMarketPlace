import React, { useEffect, useState } from "react";
import { Text, Box, Image } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function SalesBlock(props) {
    const [hid, SetHidden] = useState(1);

    const content = props.content;
    const link = "/assets/" + content.creator + "/" + content.id;
    const history = useHistory();


    return (
        <Box  >
            <Box
                border="3px solid black "
                borderRadius="2xl"
                w="600px"
                position="absolute"
                cursor="pointer"
                p="2%"
                bg="gray.300"
                onMouseEnter={() => SetHidden(-hid)}
            >
                <Image w="600px" h="auto" src={content.ipfs} />
            </Box>
            <Box
                w="600px"
                h="600px"
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
                <Text fontSize="2xl" color="white" > {content.creator.slice(0, 6)}</Text>
                <Text fontSize="1xl" color="white" > {content.description} </Text>
            </Box>
        </Box>
    );

}

function TopSales() {
    const [result, SetResult] = useState(null);

    const url = "http://192.168.31.7:8000/api/hot_nft";
    useEffect(() => {
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(res => SetResult(res))
    }, []);

    return (
        <Box w = "600px">
            <Text fontSize="4xl" > Hot NFT  </Text>
            {
                result == null ? "" :
                    result.map((res, index) => {
                        return <SalesBlock key={index} content={res} />
                    })
            }
        </Box>

    );
}

export default TopSales; 