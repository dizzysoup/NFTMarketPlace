import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Text, Textarea, Image, Flex, Spacer } from "@chakra-ui/react";
import Slider from "react-slick";
import heart from "../../Images/Icon/heart02.png";

function RecommmendBlock(props) {
    const content = props.content;    
    const link = "/assets/" + content.creator + "/" + content.id;
    const history = useHistory();
   
    return (
        <Flex
            w="90%"
            p="4%"            
            ml = "9%"
            mt = "1%"
        >
            <Box w="70%" align="left">
                <Text fontSize="3xl" > {content.title} </Text>
                <Text fontSize="2xl" > Price : {content.price} ETH </Text>
                <Text fontSize="2xl" > Topic : {content.topic} </Text>
                <Textarea
                    fontSize="2xl"
                    mt="3%"
                   
                    value = {content.description}
                    borderColor="black"
                    readOnly={true}
                />
                <Button w="full" mt="3%"
                    onClick={() => { history.push(link) }}
                > 詳細 </Button>
                <Flex mt="5%">
                    <Image w="50px" h="50px" src={heart} />
                    <Text fontSize="3xl" ml = "3%"> {content.heartnum == null ? 0 : content.heartnum} </Text>       
                    <Text fontSize="3xl" ml = "3%">  剩餘 :  {content.num == null ? 1 : content.num } </Text>             
                </Flex>
            </Box>
            <Spacer />
            <Image
                ml = "2%"
                w="400px" h="400px"
                borderRadius="1xl"
                src={content.ipfs} />           
        </Flex>
    );
}

function Recommend() {
    const [result, SetResult] = useState(null);
    const url = "http://192.168.31.7:8000/api/recommend";

    useEffect(() => {
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(res => {
                SetResult(res)
            })
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay : true , 
        autoplaySpeed : 2000
    };

    return (
        <Box ml = "1%" w = '60%' h = "auto" bg = "gray.400" p = "1%" align="center">
            <Text fontSize="4xl" align="left" ml = "5%"> Recommend </Text>
            <Box
                h="550px"
                w="1000px"
                bg="pink"
                align="center"                
            >
                <Slider {...settings}>
                {
                    result == null ? "" :
                        result.map((res, index) => {
                            return <div>
                            <RecommmendBlock key={index} content={res} />
                            </div>
                        })
                }
                </Slider>
            </Box>
        </Box>
    );
}


export default Recommend