import React, { useState, useEffect , useContext } from 'react';
import { Text, Box, Image, Flex, Textarea, Button } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { InitContext } from '../../App';

function Transaction(props) {
    const content = props.content;

    return (
        <Tr>
            <Td> {content.event}</Td>
            <Td> {content.price} </Td>
            <Td> {content.fromaddress.slice(0, 6)}</Td>
            <Td> {content.toaddress == "SmartContract" ? "SmartContract" : content.toaddress.slice(0, 6)}</Td>
            <Td> {content.date}</Td>
        </Tr>
    );
}

function ChangePFP(props){    
    const data = {
        "ipfs" : props.ipfs , 
        "account" : props.address
    }   
    const url = "http://192.168.31.7:8000/api/pfp" 
    fetch( url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(function (res) {
           console.log(res)
        })
        .catch(function (res) { console.log(res) })   
}

function CollectionItemDetail(props) {
    const [result, setResult] = useState(null);
    const content = props.content;
    const url = 'http://192.168.31.7:8000/api/trans?id=' + content.id;

    useEffect(() => {
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(res => {
                setResult(res);
            })
    }, [])
    let ChangeBtn = [];
    if (content.topic == "PFP") {
        ChangeBtn = (
            <Button ml = "10%" mt = "5%" onClick={()=> ChangePFP(content) } > Change Your PFP </Button>
        )
    }

    return (
        <Box w="100%"h = "100%">
            <Flex w="100%" h = "100%">               
                <Image
                    w="500px"
                    h="500px"
                    borderRadius="10%"
                    src={content.ipfs} 
                    justifyItems = "center"
                />                
                <Box w="100%" ml="6%"  >
                    <Flex>
                        <Text fontSize="5xl" mt="3%"> {content.title}  </Text>
                        {ChangeBtn}
                    </Flex>                 
                    <Text fontSize="2xl" mt="2%" > Topic : {content.topic} </Text>
                    <Text fontSize="1xl" > Buy from {content.date} </Text>
                    <Text fontSize="2xl" mt="2%" > Description </Text>
                    <Textarea value={content.description} readOnly={true} mt="1%" />
                    <Text fontSize="2xl" mt="5%"> Transactions </Text>
                    <Table size="md" >
                        <Thead>
                            <Tr>
                                <Th> Event </Th>
                                <Th> Price </Th>
                                <Th> From </Th>
                                <Th> To </Th>
                                <Th> Date </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                result == null ? "" :
                                    result.map((res, index) => {
                                        return <Transaction key={index} content={res} />
                                    })
                            }
                        </Tbody>
                    </Table>
                </Box>
            </Flex>
        </Box>
    );
}

export default CollectionItemDetail; 