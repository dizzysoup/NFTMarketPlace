import React, { useContext, useEffect } from 'react';
import { Flex, Button, Spacer , Box } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { Link, useHistory } from "react-router-dom";
import { InitContext } from '../App';
import { useEthers } from '@usedapp/core';


function SettingComponent() {
  return (
    <MenuItem>
      <Link to="/Setting">
        Setting
      </Link>
    </MenuItem>
  );
}


function ProfileComponent() {
  const { account , ConnectWallect } = useEthers();

  const acclink = "/AccountPage/Collection/" + account ;
  return (
    <MenuItem>
      <Link to= { acclink } >
        Profile
      </Link>
    </MenuItem>
  );
}

function LoginBtn() {  
  const { activeWallect , account } = useEthers();
  const contextData = useContext(InitContext);
  const path = useHistory();
  useEffect(()=>{   
    if(contextData.reload == 1 ) {
      contextData.SetReLoad(-1);
    }else 
      path.push("/LoginPage");
  }, [account])

  return contextData.loginstate === 0 ? (
    <Link to="/LoginPage">
      <Button mr="4" mt="10%">
        Log In
      </Button>
    </Link>
  ) :
    <Menu >
      <MenuButton as={Button} colorScheme='pink'
        mr="4" mt="0.5%" >
        Profile
      </MenuButton>
      <MenuList>
        <ProfileComponent />
        <SettingComponent />        
        <MenuItem>
          <Link to="/LoginPage"
            onClick={() => contextData.SetLogin(0)}
          >
            Log Out
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
    ;
}

class Layout extends React.Component {
  render() {
    return (
      <Box 
        w = "100%" h = "100%" 
        overflowX="hidden"
        overflowY="auto"
        position="fixed"        
        >
        <Flex
          h="6%"
          bg="gray.500"
        >
          <Button m="4" mt="0.5%">
            <Link to="/">
              Home
            </Link>
          </Button>
          <Button m="4" mt="0.5%">
            <Link to="/MarketPage">
              Market
            </Link>
          </Button>
          <Button m="4" mt="0.5%">
            <Link to="/SocialHall">
              Social Hall
            </Link>
          </Button>
          <Button m="4" mt="0.5%">
            <Link to = "/NFTSocial/home">
              0xCommunity 
            </Link>
          </Button>
          <Spacer />
          <LoginBtn />
        </Flex> 
         {this.props.children}
      </Box>
    )
  }
}

export default Layout;

