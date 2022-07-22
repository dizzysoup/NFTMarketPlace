import { Text, Flex, Box, Spacer, Image } from "@chakra-ui/react";
import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heart from "../../Images/Icon/heart02.png";
import { useEthers } from "@usedapp/core";

function NFTTitleBlock(props) {
    const [hearticon, SetHeart] = useState(false);
    const [btnclick, SetClick] = useState(false);
    const { account, connectWallet } = useEthers();
    const [count, SetCount] = useState(0);

    const content = props.content;
   
    const id = content.id;    
    const ipfs = content.ipfs;
    const title = content.title;
    const price = content.price;
    const creator = content.creator;
    const date = content.date;
    const link = content === undefined ? "" : "/assets/" + creator + "/" + id;
   
    const url = "http://192.168.31.7:8000/api/favorite_count/?id=" + id;
    const hearturl = "http://192.168.31.7:8000/api/favorite_chk/?id=" + id +"&&account=" + account ;

    useEffect(() => {
        fetch(hearturl , {method:"GET"})
        .then(res => res.json())
        .then(res => {                
            if (res.length != 0){                    
                SetClick(true)
            }                    
        })
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(res => {               
                SetCount(res[0].count)
            })       
    }, [])

    const Click = async() => {
        if (btnclick){
            SetClick(false)
            SetCount(count-1);
            if(props.contextdata != undefined)
                props.contextdata.SetReLoad(10);
        }            
        else{
            SetClick(true)
            SetCount(count+1)
            if(props.contextdata != undefined)
                props.contextdata.SetReLoad(-10);
        }
        
        const data = {
            "address": account,
            "id": id,
            "action": btnclick
        }
        const posturl = "http://192.168.31.7:8000/api/favorite";        
        fetch(posturl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(function (res) { console.log(res) })
            .catch(function (res) { console.log(res) })
    }

    return (
        <label
            cursor="pointer"
        >
            <Box
                bg="gray.200"
                w="90%"
                h="95%"
                m="10px"
                border="1px solid gray.600"
                borderRadius="3xl"
            >
                <Link to={link} >
                    <Flex
                        w="100%"
                        h="auto"
                        mt="2%"
                        mr="5%"
                        justifyContent="center"
                    >
                        <Image
                            boxSize="60%"
                            border="1px solid #595656"
                            borderRadius="10px"
                            align="center"
                            src={ipfs}
                        />
                    </Flex>
                    <Box
                        alignItems="flex-end"
                        mt="2%"
                        mr="5%"
                        ml="5%"
                    >
                        <Text
                            fontSize="1xl"
                        > {title}  #{id}  </Text>

                        <Text color="blue.600"> Deployed on  {date} </Text>
                    </Box>
                    <Flex mr="2%" ml="5%"  >
                        <Text fontSize="1xl" ml="0.5px"> Price : </Text>
                        <Spacer />
                        <Text fontSize="1xl" ml="2px"> {price} ETH </Text>
                    </Flex>
                    <Flex mr="2%" ml="5%">
                        <Text fontSize="1xl" >
                            Creator :
                        </Text>
                        <Spacer />
                        <Text fontSize="1xl" title = {creator}>
                            {creator && `${creator.slice(0, 6)}...${creator.slice(
                                creator.length - 4,
                                creator
                            )}`}
                        </Text>
                    </Flex>
                </Link>
                <hr style={{
                    backgroundColor: "gray",
                    height: 2,
                    width: "100%"
                }} />
                <Flex>
                    <Box w="30px" h="auto" mt="2%" ml="5%"  >
                        <Image
                            w="100%"
                            h="auto"
                            src={heart} 
                            cursor="pointer"
                            bg={
                                btnclick == true ? "red.300" : hearticon == true ? "red.300" : ""
                            }
                            onMouseEnter={() => { SetHeart(true) }}
                            onMouseLeave={() => { SetHeart(false) }}
                            onClick={() => Click()}
                        />                                  
                    </Box>
                              
                    <Text fontSize="2xl" ml="2.5%"> {count} </Text>
                    <Spacer />
                    <Text fontSize="2xl" mr = "10%"> 剩餘 : { content.num - content.sale} </Text> 
                </Flex>
            </Box>
        </label>
    )
}

export default NFTTitleBlock; 