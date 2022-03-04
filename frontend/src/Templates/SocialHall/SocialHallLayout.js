import React, { Component, useContext } from 'react';
import { Box, Text } from "@chakra-ui/react";
import { List, ListItem } from '@chakra-ui/react'
import { Link, useLocation } from "react-router-dom";

import { InitContext } from '../../App';

function ListComponent(props) {
    const location = useLocation().pathname;  // 取得當前 url 位址 
    const conxtData = useContext(InitContext);
    const linkstr = "/SocialHall/" + props.name;
    return (
        <ListItem>
            <Box
                mt="10%"
                ml="10%"
                w="80%"
                backgroundColor={location === linkstr ? "gray.400" : "gray.500"}
                pl="20%"
            >
                <Link to={linkstr} onClick={() => conxtData.SetPost(-1)} >
                    <Text fontSize="2xl" fontWeight="bold">
                        {props.name}
                    </Text>
                </Link>
            </Box>
        </ListItem>
    );
}

function Topic() {
    const conxtData = useContext(InitContext);
    return (
        <Box
            backgroundColor="gray.400"
            h="10%"
            pl="25%"
            pt="10%"
        >
            <Link to="/SocialHall" onClick={() => conxtData.SetPost(-1) }>
                <Text fontSize="3xl"> ALL TOPIC  </Text>
            </Link>
            
        </Box>
    );
}

class SocialHallLayout extends Component {
    render() {
        return (
            <Box
                background="gray.300"
                w="100%"
                h="80%"
                position="relative"                 
            >
                
                <Topic />
                <List spacing={4}>
                    <ListComponent name="PFP" />
                    <ListComponent name="ArtWork" />
                    <ListComponent name="Music" />
                    <ListComponent name="Game" />
                </List>
               
            </Box>

        );
    }
}



export default SocialHallLayout; 