import React from 'react';
import {  Flex } from "@chakra-ui/react";
import { useEthers } from '@usedapp/core';
import ResellLayout from './ResellLayout';
import ResellNowSell from './ResellNowSell';
import { useLocation , useParams } from 'react-router-dom';


function ResellPage(){
    const {asciveWallect , account  } = useEthers();
   const address = useParams().address;
    console.log(address)
    return (
        <Flex
            w = "100%" 
            h="100%"
            mt = "1.5%"    
            position= "fixed"        
            bg = "gray.500"
        >
            {account != address ? "" :  <ResellLayout account = {account} /> }           
            <ResellNowSell account = {address} />

        </Flex>
    );
}



export default ResellPage ; 