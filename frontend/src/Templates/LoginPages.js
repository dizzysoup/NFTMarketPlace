import React, { useContext, useEffect } from 'react';
import { Text, Button, Flex, Image, UnorderedList } from '@chakra-ui/react';
import { Link, useHistory } from "react-router-dom";
import MetaMaskImg from '../Images/metamask.png';
import { InitContext } from '../App';
import { useEthers } from "@usedapp/core";


function LoginPage() {    
    const contextData = useContext(InitContext);
    const { activateBrowserWallet, account } = useEthers()   
    function LoginMetaMask() {
       contextData.SetLogin(1);
       activateBrowserWallet();       
    }
    
    return (
        <Flex
            flexDirection="column"
            h="100vh"
            bg="gray.100"
            alignItems="center"
            justifyContent="center"
        >
            <Flex
                flexDirection="column"
                h="100vh"
                align = "center"
                justifyContent="center"
            >
                <Text fontSize="4xl"> 
                    {
                        account == undefined ? 
                        " Sign in to your wallet " : "WelCome!"
                    }                   
                </Text>
                <Image type="image" src={MetaMaskImg} />
                <Link to={ account == undefined ? "" : "AccountPage/Collection/" +account } >
                    <Button  w="200px" h="60px" colorScheme="blue" onClick={LoginMetaMask} >
                        { account == undefined ? "Login with MetaMask" : "Continue"}
                    </Button>                    
                </Link>
            </Flex>
            <Text> { account } </Text>
        </Flex>
    );
}

export default LoginPage;