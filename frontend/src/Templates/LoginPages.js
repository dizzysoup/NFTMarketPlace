import React, { useContext } from 'react';
import { Text, Button, Flex, Image } from '@chakra-ui/react';
import { Link  } from "react-router-dom";
import MetaMaskImg from '../Images/metamask.png';
import { InitContext } from '../App';
import { useEthers } from "@usedapp/core";


function LoginPage() {    
    const contextData = useContext(InitContext);
    const { activateBrowserWallet , account } = useEthers();
    function LoginMetaMask() {      
       contextData.SetLogin(1);
       contextData.SetReLoad(1); // 避免二次讀取變數
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
                        contextData.loginstate === 0  ? 
                        " Sign in to your wallet " : "WelCome!"
                    }                   
                </Text>
                <Image type="image" src={MetaMaskImg} />
                <Link to={ contextData.loginstate === 0  ? "" : "AccountPage/Collection/" +account } >
                    <Button  w="200px" h="60px" colorScheme="blue" onClick={() => LoginMetaMask()} >
                        Login with MetaMask
                    </Button>                    
                </Link>
            </Flex>           
        </Flex>
    );
}

export default LoginPage;