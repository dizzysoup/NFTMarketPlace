import React, { useState, useEffect, useContext } from 'react';
import { Text, Box, Image, Flex, Textarea, Button } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, Collapse } from "@chakra-ui/react";
import { InitContext } from '../../App';
import { Link } from 'react-router-dom';
import { useEthers } from '@usedapp/core';
import sha256 from '../../Components/Crypto';
import QrCode from "qrcode.react";
import { downloadQRCode } from '../../Components/Qrcode';

function Transaction(props) {
    const content = props.content;
    return (
        <Tr>
            <Td> {content.event}</Td>
            <Td> {content.price} </Td>
            {content.fromaddress == "SmartContract" ?
                <Td > SmartContract  </Td> :
                <Td color="blue" textDecoration="underline" title={content.fromaddress} >
                    <Link to={"/AccountPage/Collection/" + content.fromaddress}>
                        {content.fromaddress == "SmartContract" ? "SmartContract" : content.fromaddress.slice(0, 12)}
                    </Link>
                </Td>
            }

            <Td color="blue" textDecoration="underline" title={content.toaddress} >
                <Link to={"/AccountPage/Collection/" + content.toaddress}>
                    {content.toaddress.slice(0, 12)}
                </Link>
            </Td>
            <Td> {content.date}</Td>
        </Tr>
    );
}

function ChangePFP(props) {
    const data = {
        "ipfs": props.ipfs,
        "account": props.address
    }
    const url = "http://192.168.31.7:8000/api/pfp"
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (res) { console.log(res) })
}

function CollectionItemDetail(props) {
    const contextData = useContext(InitContext);
    const [result, setResult] = useState(null);
    const [show, setShow] = useState(false);
    const content = props.content;   
    const { activeWallet, account } = useEthers();
    const url = 'http://192.168.31.7:8000/api/trans?id=' + content.id;
    const hash = sha256(account + content.ipfs);    
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
            <Button ml="10%" mt="5%" onClick={() => {
                ChangePFP(content)
                contextData.SetReLoad(contextData.reload + 1)
            }} > Change Your PFP </Button>
        )
    }

    return (
        <Box w="100%" h="100%">
            <Flex w="100%" h="100%" p="1%">
                <Flex w="900px" h="auto" align="center" justifyItems="center" >
                    <Image
                        w="500px"
                        h="500px"
                        borderRadius="10%"
                        src={content.ipfs}
                        justifyItems="center"
                    />
                </Flex>
                <Box w="100%" ml="4%"  >
                    <Flex>
                        <Text fontSize="5xl" mt="3%"> {content.title}  </Text>
                        {ChangeBtn}
                    </Flex>
                    <Flex>
                        <Box align="left" >
                            <Text fontSize="2xl" mt="2%" > Topic : {content.topic} </Text>
                            <Text fontSize="1xl" > Buy from {content.date} </Text>
                            <Text fontSize="2xl" mt="1%" > Description </Text>
                        </Box>
                        {account === content.address ?                            
                            <Flex ml="10%">
                                <Button onClick={() => setShow(!show)}> Member </Button>
                                <Collapse in={show}>
                                    <Box cursor="pointer"
                                        ml="5%"
                                        onClick={() => downloadQRCode(hash)}
                                    >
                                        <QrCode
                                            id="qrcode"
                                            value={hash}
                                            size={100}
                                            fgColor="#000000"
                                        />
                                    </Box>
                                </Collapse>
                            </Flex> : "" 
                        }
                    </Flex>

                    <Textarea value={content.description} readOnly={true} mt="1%" />
                    <Text fontSize="2xl" mt="3%"> Transactions </Text>
                    <Box w="auto" h="200px" overflowX="hidden" overflowY="auto">
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
                </Box>
            </Flex>
        </Box>
    );
}

export default CollectionItemDetail; 