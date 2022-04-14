/* eslint-disable react/jsx-pascal-case */
import React, { useState ,  useEffect } from "react";
import { Box, } from "@chakra-ui/react";
import Content_Block from "./Content_Block";

function Get_ContentBlock(props) {
    const creator = props.creator;
    const count = props.count ; 
    const [result, setResult] = useState(null);     
    
    useEffect(() => {
        const selectstr = 'http://192.168.31.7:8000/api/social_select?creator=' + creator;       
        fetch( selectstr , { method : 'GET'})
         .then( res => res.json() )
         .then(res => {
            setResult(res)                                    
         })       
    },[creator , count ])

    return (
        <Box h="100%" w="100%" overflow="auto">
            {
                result === null ? '' :
                result.map((res, index) => {
                    return <Content_Block key={index} data={res} > {res} </Content_Block>
                })
            }
        </Box>
    );

}

export default Get_ContentBlock; 