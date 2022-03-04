import React, { useState, useEffect, useContext } from 'react';
import { Box, Text, Flex, Image, Spacer } from "@chakra-ui/react";
import AddressIcon from '../../Components/AddressIcon';
import { InitContext } from '../../App';

function Content_Block(props) {
    const data = props.data;
    
    const [pfp , SetPFP ] = useState(null);
    const [name , SetName ] = useState(null);

    const contextdata = useContext(InitContext);
    const image = data.image == null ? "" : <Image w="150px" h="150px" src={data.image} />
    
    useEffect(() => {
        const url = "http://192.168.31.7:8000/api/account/?account=" + data.releasehash;
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then(res => {
                SetPFP(res[0].PFP)   
                SetName(res[0].name)            
            })
            .catch(err => console.log(err))
    }, [data.releasehash])

    return (
        <Box
            mt="2%"
            cursor="pointer"
            w="95%"
            h="20%"
            onClick={() => contextdata.SetPost(data.id)}
        >
            <Flex w = "100%" >
                <Box w = "100%" >
                    <Flex w = "100%" >
                        {
                            pfp == null ?
                            <AddressIcon diameter={80} address={data.releasehash} />
                            : <Image w="12%" h="auto" borderRadius="full" src={pfp} />
                        }
                        
                        <Box ml="3%" >
                            <Text > { 
                                name == null ?
                                data.releasehash.slice(0, 6) :  name
                            } </Text>
                            <Text> {data.date} </Text>
                            <Box
                                w="60%"
                                bg="blue.300"
                                pl="5%"
                                mt="2%"
                                borderRadius="2xl"
                            >
                                <Text> {data.classification} </Text>
                            </Box>
                        </Box>
                    </Flex>
                    <Box mt="1%" mb="1%">
                        <Text fontSize="3xl" >{data.title} </Text>
                        <Text color="gray.600" > {data.content} </Text>
                    </Box>
                </Box>
                <Spacer />
                { image }
            </Flex>


            <hr style={{
                backgroundColor: "gray",
                height: 1,
                width: "100%"
            }} />
        </Box>
    );

}

function SocialHallContentBlock(props) {
    const [result, setResult] = useState(null);
    const name = props.name;
    const selectstr = 'http://192.168.31.7:8000/api/socialhall/?topic=' + name;

    useEffect(() => {
        fetch(selectstr, { method: 'GET' })
            .then(res => res.json())
            .then(res => {
                setResult(res)
            })
    }, [props.name])

    return (
        <Box h="100%" w="95%" overflow="auto" >
            {
                result === null ? '' :
                    result.map((res, index) => {
                        return <Content_Block key={index} data={res} > {res} </Content_Block>
                    })
            }
        </Box>
    );
}

export default SocialHallContentBlock; 
