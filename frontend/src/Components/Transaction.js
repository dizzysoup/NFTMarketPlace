import React, { Component } from "react";
import { Text, Box,  Image } from "@chakra-ui/react";


class Transaction extends Component {
    render() {
        let {account , ipfs} = this.props;

        return (
            <Box
                borderRadius="2xl"
                bg = "yellow.300"
                border="1px solid black"            
                m="10px"
                p="10px"
                w="250px"
                h="220px"
            >

                <Text > Account : {account && `${account.slice(0, 6)}...${account.slice(
                    account.length - 4,
                    account.length
                )}`} </Text>                
                 <Image w="100%" h = "90%" src= { ipfs} />


            </Box>
        );
    }
}


export default Transaction;