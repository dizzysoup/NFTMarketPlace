import React, { useState, Component, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Text, Box, Button  } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

function TransactionTable(props) {
    const content = props.content ; 
    const account = props.account;
    let history = useHistory();
    const nfturl = "/assets/" + content.creator + "/" + content.id ;
    if (content.toaddress == account ){
        content.event = "Buyed"        
    }
    return (
        <Tr>
            <Td> { content.event }</Td>
            <Td> { content.price } </Td>
            <Td> { content.fromaddress.slice(0,10) } </Td>
            <Td> { content.toaddress.slice(0,10) } </Td>
            <Td> { content.date } </Td>
            <Td> <Button color = "black" onClick={() => history.push(nfturl)}> 詳細 </Button> </Td>
        </Tr>
    );
}


function TransactionPage(props) {
    const [result, SetResult] = useState([]);
    const account = props.account ;
   

    useEffect(() => {
        const url = 'http://192.168.31.7:8000/api/trans_account/?account=' + account;
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(res => {
                SetResult(res)               
            })
    }, [account])

    return (
        <Box
            w="100%"
            h="100%"
            bg="gray.600"
            mt="1.5%"
            position="fixed"
        >
            <Box align = "center" >
                <Text
                    color="white"
                    fontSize="5xl"
                    mt="2%"
                > Transaction History </Text>
            </Box>
            <Box ml="20%" w = "60%" mt = "2%">                
                <Table size="md" color="white" >
                    <Thead>
                        <Tr   >
                            <Th color="white" > Event </Th>
                            <Th color="white" > Price </Th>
                            <Th color="white" > From </Th>
                            <Th color="white" > To </Th>
                            <Th color="white" > Date </Th>
                            <Th color="white" > Link </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            result == null ? "" :
                                result.map((res, index) => {
                                    return <TransactionTable key={index} content={res} account = { account }/>
                                })
                        }
                    </Tbody>
                </Table>
                { result.length == 0 ? 
                    <Text fontSize="5xl" align="center" color = "white" mt="2%" > No Transaction </Text> : ""
                  
                }
            </Box>



        </Box >
    );
}

export default TransactionPage; 