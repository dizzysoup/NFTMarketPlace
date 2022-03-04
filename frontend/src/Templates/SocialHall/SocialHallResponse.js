import React, { useState, useEffect, createRef, useContext } from 'react';
import { Box, Text, Flex, Input, Image, Button } from "@chakra-ui/react";
import AddressIcon from '../../Components/AddressIcon';
import { useHistory } from 'react-router-dom';
import { useEthers } from '@usedapp/core';
import arrowIcon from '../../Images/Icon/5049721_1.jpg';
import { InitContext } from '../../App';
import { Link } from 'react-router-dom';

function TitleBlock(props) {
    const data = props.data;
    const history = useHistory();

    const [pfp , SetPFP ] = useState(null);
    const [name , SetName ] = useState(null);

    useEffect(() => {
        const url = "http://192.168.31.7:8000/api/account/?account=" + data[0].releasehash;
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then(res => {                
                SetPFP(res[0].PFP)   
                SetName(res[0].name)            
            })
            .catch(err => console.log(err))
    }, [data.releasehash])

    return (
            <Box w="95%" bg="gray.300" h="auto" pl="4%" borderRadius="3xl">
                <Flex align="center"  w= "100%" >
                    <Box mt="2%" cursor="pointer" w = "15%">
                        <Link to={"/AccountPage/Collection/" + data[0].releasehash}>
                            {
                                pfp == null ? 
                                <AddressIcon diameter={80} address={data[0].releasehash} />
                                : <Image boxSize="90%" borderRadius="full" src={pfp}/>                                
                                
                            }                           
                            <Text ml="15%" >{
                                name == null ? 
                                data[0].releasehash.slice(0, 8)
                                : name 
                            } 
                            </Text>
                        </Link>
                    </Box>
                    <Text fontSize="3xl" ml="5%"> {data[0].title} </Text>
                </Flex>
                <Flex align="center" >
                    <Box
                        w="10%"
                        bg="blue.300"
                        mt="1%"
                        pl="2%"
                        borderRadius="2xl"
                    >
                        <Text mt="2%">  {data[0].classification} </Text>
                    </Box>
                    <Text color="gray.800" mt="1%" ml="1%" > {data[0].date} </Text>
                </Flex>

                <Text mt="5%"> {data[0].content} </Text>
                {
                    data[0].image == null ? "" :
                        <Image w="300px" h="300px" src={data[0].image} />
                }
                {
                    data[0].route == null ? "" :
                        <Button mt="3%" onClick={() => history.push(data[0].route + data[0].nft_id)} > 查看詳細 </Button>
                }
                <Text mt="5%" fontSize="1xl" color="gray.600" pb="3%"> 回應 </Text>
            </Box>
        );
}

function ResponseBlock(props) {
    const [result, setResult] = useState(null);
    const contextdata = useContext(InitContext);    

    const url = 'http://192.168.31.7:8000/api/socialhall/content/?id=' + props.id;
    useEffect(() => {
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then(res => {
                setResult(res)
            })
    }, [props.id, contextdata.responsestate])

    return (
        <Box>
            {
                result == null ? "" :
                    result.map((res, index) => {
                        return (
                            <Box
                                h="auto"
                                w="95%"
                                bg="gray.200"
                                mt="2%"
                                borderRadius="3xl"
                            >
                                <Flex align="center" ml="2%" p="1%" >
                                    {
                                        res.PFP == null ?
                                        <AddressIcon diameter={50} address={res.account} />  :
                                        <Image w="10%" borderRadius="full" src={res.PFP} />
                                    }
                                   
                                    <Box ml="1%" >
                                        <Text > {
                                            res.name == null ?
                                            res.account.slice(0, 8) : res.name 
                                        } </Text>
                                        <Text > {res.content} </Text>
                                        <Text> B{index + 1}。 {res.date}  </Text>
                                    </Box>
                                </Flex>
                            </Box>
                        );
                    })
            }
        </Box>
    );
}

function InputBlock(props) {
    const { account, connectWallect } = useEthers();
    const contextdata = useContext(InitContext);
    let inputText = createRef();

    let ResponseBtn = (e) => {
        const content = inputText.current.value;
        const date = new Date();
        const datestr = date.getFullYear() + "/" + date.getMonth() + 1 + "/" + date.getDate() +
            (date.getHours > 12 ? " 上午 " : " 下午 ") + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + ":"
            + (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes());
        const postdata = {
            "account": account,
            "content": content,
            "date": datestr,
            "id": props.id
        }
        const url = "http://192.168.31.7:8000/api/socialhall/response";

        if (content !== "") {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(postdata)
            })
                .then(
                    function () {
                        contextdata.UpdateResponse(contextdata.responsestate + 1);
                    })
                .catch(function (res) { console.log(res) })
        }
        inputText.current.value = "";
    }

    return (
        <Box p="2%">
            <Flex align="center" >
                <AddressIcon diameter={30} address={account} />
                <Input
                    placeholder=" 留言......  "
                    fontSize="2xl"
                    borderColor="black"
                    h="100%"
                    w="85%"
                    mr="1%"
                    ml="1%"
                    type="text"
                    ref={inputText}
                />
                <Image
                    type="Image"
                    src={arrowIcon}
                    boxSize='5%'
                    borderRadius='full'
                    cursor="pointer"
                    onClick={() => ResponseBtn()}
                />
            </Flex>
        </Box>
    );
}

function SocialHallResponse(props) {
    const [result, setResult] = useState(null);
    const topic = props.topic;
    const id = props.id;
    const selectstr = 'http://192.168.31.7:8000/api/socialhall/response/?id=' + props.id
    useEffect(() => {
        fetch(selectstr, { method: 'GET' })
            .then(res => res.json())
            .then(res => {
                setResult(res)
            })
    }, [id])
    return result == null ? "" :
    (
        <Box
        >
            <TitleBlock data={result} />
            <ResponseBlock id={id} />
            <InputBlock id={id} />
        </Box>
    );
}

export default SocialHallResponse;

