import { Flex, Image, Text, Box, Spacer, Progress, Button, HStack  } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import TransactionActivity from "./TransactionActiviry";
import BuyButton from "./BuyButton";
import React, { useState, useEffect, useContext } from "react";
import { InitContext } from "../../App";
import { useEthers } from "@usedapp/core";
import lock from "../../Images/lock.png";
import ganache from "../../Images/ganache.png";
import databases from "../../Images/databases.png";
import QrCode from "qrcode.react";

const BoxStyle = {
    border: "5px solid ",
    borderColor: "gray.400",
    borderRadius: "10px",
    mt: "5%",
    p: "1%",
    pl: "2%"
}

const FontStyle = {
    fontSize: "2xl",
    mt: "1%"
}

const QrCodeStyle = {
    boxSize: "200px",
    border: "1px dashed #595656",
    borderRadius: "10px",
}

function DescriptionBlock(props) {
    const result = props.result

    const link = "/AccountPage/Collection/" + result.creator;

    return (
        <Flex>
            <Box
                border="5px solid"
                borderColor="gray.300"
                borderRadius="5px" >
                <Image w="600px" h="600px" src={result.ipfs} />
            </Box>
            <Box ml="1%" >
                <Text fontSize="6xl" fontWeight="bold" mt="5%" >
                    {result.title} # {result.id}
                </Text>
                <Flex flexDirection="row">
                    <Text
                        fontSize="20px"
                        color="gray.600"
                    >
                        Creator by
                    </Text>
                    <Link to={link}>
                        <Text
                            color="blue"
                            fontSize="20px"
                            ml="3"
                            cursor="pointer"
                        >
                            {result.name === undefined ? result.creator : result.name}
                        </Text>
                    </Link>
                </Flex>
                <Link to={link}>
                    <Text color="blue.500">
                        {result.name === undefined ? '' : result.creator}
                    </Text>
                </Link>
                <Box {...BoxStyle}>
                    <Flex >
                        <Box>
                            <Text
                                fontSize="20px"
                                color="gray.600"
                            > Price </Text>
                            <Text
                                fontSize="30px"
                                color="gray.600"
                            > {result.price} ETH </Text>
                        </Box>
                        <Spacer />
                        <Box mr="40%">
                            <Text
                                fontSize="20px"
                                color="gray.600"
                            > Count </Text>
                            <Text
                                fontSize="30px"
                                color="gray.600"
                            >
                                <Flex>
                                    <Text color={result.sale == 0 ? "red.300" : "gray.600"}> {result.sale} </Text> / {result.num}
                                </Flex>
                            </Text>
                        </Box>

                    </Flex>
                    <BuyButton
                        ipfsHash={result.ipfs} creator={result.creator} price={result.price} id={result.id}
                        sale={result.sale}
                    />
                </Box>
                <Box {...BoxStyle} height="43%" >
                    <Text
                        fontSize="4xl"
                        fontWeight="bold"
                    >
                        Description
                    </Text>
                    <Text mt="1%"> {result.description} </Text>
                </Box>

            </Box>
        </Flex>
    );
}

function TransactionBlock(props) {
    const result = props.result;

    return (
        <Box
            mt="1%"
        >
            <Text
                fontSize="4xl"
                fontWeight="bold"
            >
                Item  Activity
            </Text>
            <TransactionActivity creator={result.creator} no={result.id} />
        </Box>

    );
}


const downloadQRCode = (qrcode) => {
    const canvas = document.getElementById("qrcode");
    const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl
    downloadLink.download = `${qrcode}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function ProcessBlock() {
    const { activeAccount, account } = useEthers();
    const context_val = useContext(InitContext);
    const path = useHistory();
    const accountlist = "/AccountPage/Collection/" + account;
    const [timer, SetTimer] = useState(0);
    
    useEffect(() => {
        let Id = setInterval(() => {
            SetTimer((prev) => {
                if (prev >= context_val.val) {
                    clearInterval(Id);
                }
                return prev + 1;
            })
        }, 30);
    }, [context_val.val])

    return (
        
        <Box w="100%" h="700px" mt="3%" p="5%"  >
            <Text fontSize="3xl"> 交易進行中 </Text>
            <Flex
                bg="gray.300" borderRadius="3xl" p="5%" flexDirection="column" >
                <Box w="100%">
                    <HStack spacing="20%">
                        <Flex flexDirection="column" align="center" w="20%" >
                            <Image boxSize={150} src={lock} />
                            <Text {...FontStyle}>  資料雜湊 </Text>
                        </Flex>
                        <Flex flexDirection="column" align="center" w="20%" >
                            <Image boxSize={150} src={ganache} />
                            <Text {...FontStyle}>  上鏈 </Text>
                        </Flex>
                        <Flex flexDirection="column" align="center" w="20%" >
                            <Image boxSize={150} src={databases} />
                            <Text {...FontStyle}>  存放資料庫 </Text>
                        </Flex>
                    </HStack>

                    <Progress value={timer} mt="1%" />
                </Box>
                <Flex alignItems="flex-end"   >
                    <Flex ml="30%" align="center" flexDirection="column" >
                        <Text fontSize="5xl" mt="3%"> 會員通行證  </Text>

                        <Box {...QrCodeStyle}
                            onClick={() => downloadQRCode(context_val.data)}
                            cursor="pointer"
                            mt="4%"
                        >
                            {context_val.data === '' ? '' :
                                <QrCode
                                    id="qrcode"
                                    value={context_val.data}
                                    size={200}
                                    fgColor="#000000"
                                />
                            }
                        </Box>
                    </Flex >
                    <Spacer />
                    <Box mt="5%" mr="5%" id="roll">
                        {context_val.data === "" ?
                            <Button color="gray"> 購買中 </Button> :
                            <Button onClick={() => {                                
                                path.push(accountlist);                                
                            }} color="green" > 前往個人頁面 </Button>
                        }
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
}


function ProductDetailPage(props) {
    const no = props.match.params.id // 編號 ( 記錄在url 上 )      
    const connstr = 'http://192.168.31.7:8000/api/select?id=' + no
    const [result, setResult] = useState(null);
    const context_val = useContext(InitContext);

    useEffect(() => {
        fetch(connstr, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setResult(data[0]);
            })
            .catch(e => { console.log(e) })
    }, [no])

    return (
        <Box
            ml="25%"
            mt="3%"
            boxSize="60%"
        >          
                    
            {result == null ? <Text> no Data  </Text> :
                !context_val.status ?                 
                <Box>
                    <DescriptionBlock result={result} />
                    <TransactionBlock result={result} />   
                </Box> :  <ProcessBlock />
            }
        </Box>
    )
}
export default ProductDetailPage