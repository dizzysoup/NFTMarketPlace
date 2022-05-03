import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { Text, Box, Image, Flex, Button } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { Collapse } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { downloadQRCode } from "../../Components/Qrcode";
import sha256 from "../../Components/Crypto";
import QrCode from "qrcode.react";


function TableData(props) {
    const content = props.content;
    return (
        <Tr>
            <Td> {content.event} </Td>
            <Td >
                {content.toaddress != "SmartContract" ?
                    <Link to={"/AccountPage/Collection/" + content.toaddress} title={content.toaddress}>
                        <Text
                            color="blue"
                            textDecoration="underline"
                            cursor="pointer"
                        >
                            {content.toaddress.slice(0, 13)}
                        </Text>
                    </Link>
                    : content.toaddress
                }

            </Td>
            <Td> {content.price}</Td>
            <Td> {content.date} </Td>
        </Tr>
    );
}

function TransactionBLock(props) {
    const content = props.content;
    const result = props.result;

    return (
        <Box ml="1%" mr="1%" w="100%">
            <Text fontSize="4xl"> {content.Title} </Text>
            <Text fontSize="2xl" color="gray.700" aling="center" > Totally Earn : {result[0].totally} ETH</Text>
            <Text fontSize="1xl" color="gray.700" align="left" > History :  </Text>
            <Box mt="2%" w="100%" h="190px"
                borderRadius="1xl"
                borderWidth="medium"
                borderColor="gray.600"
                overflowY="auto"
                overflowX="hidden"
            >
                <Table size="sm" >
                    <Thead>
                        <Tr>
                            <Th> Event </Th>
                            <Th> Address </Th>
                            <Th> Price </Th>
                            <Th> Date  </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {result.map((res, index) => {
                            return <TableData key={index} content={res} />
                        })}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
}

function DownloadQrCodeBtn(props) {
    const account = props.account;
    const ipfs = props.ipfs;
    const hash = sha256(ipfs + account);
    const [show, setShow] = useState(false);
    return (

        <Flex ml="5%" mt="1%">
            <Button onClick={() => setShow(!show)}>  Member Card </Button>
            <Collapse in={show} >
                <Box
                    ml="5%"
                    onClick={() => downloadQRCode(hash)}
                    cursor="pointer"
                >
                    <QrCode
                        id="qrcode"
                        value={hash}
                        size={100}
                        fgColor="#000000"

                    />
                </Box>
            </Collapse>
        </Flex>


    );
}

function CollectionCreatorList(props) {
    const { ActiveWallect, account } = useEthers();
    const [result, setResult] = useState([]);
    const content = props.content;    
    const url = "http://192.168.31.7:8000/api/nft_totally?id=" + content.ID;
    useEffect(() => {
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setResult(data);
            })
            .catch(e => { console.log(e) })
    }, [])
    return (
        <Box align="left" >
            <Flex>
                <Image boxSize="300px" src={content.IpfsHash} />

                <Box ml="2%">
                    {result.length !== 0 ? <TransactionBLock content={content} result={result} /> : ""}
                    {account === content.CreateHash ? <DownloadQrCodeBtn account={account} ipfs={content.IpfsHash} /> : ""}
                </Box>

            </Flex>
        </Box>
    );
}


export default CollectionCreatorList