/* eslint-disable react/jsx-pascal-case */
import React,{ useContext , useEffect, useState } from "react";
import { Box , Text ,Flex } from "@chakra-ui/react";
import { InitContext } from "../../App";
import AddressIcon from "../../Components/AddressIcon";

function CreatorBlock(props){
    const creator = props.creator; 

    return(
        <>  
            <Text fontSize="2xl" color="gray.100"> Creator -  </Text>  
            <Flex mt = "5%" align="center" >
                <AddressIcon diameter = {50} address = {creator} />
                <Text color = "white" ml="5%" > {creator.slice(0,9)} </Text>
            </Flex>
        </>
    );
}

function MemberBlock(){
    const [ member , SetMember ] = useState([]);
    const context_val = useContext(InitContext);
    const api = "http://192.168.31.7:8000/api/communitymember?id=" + context_val.val.ID;
    
    useEffect(()=>{
        fetch(api , { method : "GET"})
            .then(res => res.json())
            .then(res => SetMember(res))
    },[])

    return(
        <>
            <Text fontSize="2xl" color="gray.100"> Member -  </Text>    
            {
                member.length === 0 ? "" :
                member.map((index , key) => {
                    const address = index.address;                    
                    return <Flex mt = "5%" align="center" > 
                        <AddressIcon diameter = {50} address = {address} />
                        <Text color = "white" ml="5%" > {address.slice(0,9)} </Text>
                    </Flex>
                })
            }
        </>
    );
}

function Content_member(){ 
    const context_val = useContext(InitContext);
    const creator = context_val.val.CreateHash; 
    return(
        <Box 
            h = "100%" 
            w = "100%" 
            bg = "gray.600"
        >           
            <Box
                w = "100%"
                h = "95%"    
                pt = "5%"        
                pl = "4%"
            >
                <CreatorBlock creator = {creator} />
                <MemberBlock />
            </Box>
        </Box>
    );
}


export default Content_member