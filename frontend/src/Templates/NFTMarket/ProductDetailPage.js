import { Flex, Image, Text, Box ,Spacer} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import TransactionActivity from "./TransactionActiviry";
import BuyButton from "./BuyButton";
import React, { useState, useEffect } from "react";


function DescriptionBlock(props) {
    const result = props.result
    const link = "/AccountPage/Collection/" + result.creator;

    return (
        <Flex>
            <Box
                border="5px solid"
                borderColor="gray.300"
                borderRadius="5px" >
                <Image
                    w="600px"
                    h="600px"
                    src={result.ipfs} />

            </Box>
            <Box
                ml="1%"
            >
                <Text
                    fontSize="6xl"
                    fontWeight="bold"
                    mt="5%"
                >
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
                <Box
                    border="5px solid "
                    borderColor="gray.400"
                    borderRadius="10px"
                    mt="5%"
                    p="1%"
                    pl="2%"
                >
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
                        <Box mr = "40%">
                            <Text
                                fontSize="20px"
                                color = "gray.600"
                            > Count </Text>
                            <Text
                            fontSize="30px"
                            color="gray.600"
                        >
                            <Flex>
                                <Text color = { result.sale == 0 ? "red.300" :　"gray.600" }> {result.sale} </Text> / { result.num }
                            </Flex>
                           </Text>
                        </Box>
                        
                    </Flex>
                    <BuyButton 
                        ipfsHash={result.ipfs} creator={result.creator} price={result.price} id={result.id} 
                        sale = { result.sale }
                    />
                </Box>
                <Box
                    border="5px solid "
                    borderColor="gray.400"
                    borderRadius="10px"
                    height="43%"
                    mt="3%"
                    p="1%"
                    pl="2%"
                >
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

function ProductDetailPage(props) {
    const no = props.match.params.id // 編號 ( 記錄在url 上 )   
    const connstr = 'http://192.168.31.7:8000/api/select?id=' + no
    const [result, setResult] = useState(null);
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
                <Box>
                    <DescriptionBlock result={result} />
                    <TransactionBlock result={result} />
                </Box>
            }
        </Box>
    )
}
export default ProductDetailPage