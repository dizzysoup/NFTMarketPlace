import React, { useContext } from 'react';
import { Box, Text, Image, Flex, Spacer } from "@chakra-ui/react";
import {  useLocation } from "react-router-dom";
import PencilIcon from "../../Images/Icon/5590.jpg";
import SocialHallPostPage from './SocialHallPostPage';
import { InitContext } from '../../App';
import SocialHallContentBlock from './SocialHallContentBlock';
import SocialHallResponse from './SocialHallResponse';


function TitleComponent(props) {
    const contextData = useContext(InitContext);
    const name = props.name
    return (

        <Box
            w="100%"
            h="15%"
        >
            <Box
                h="80%"
                mb="1%"
            >
                <Flex
                    mr="8%"
                >
                    <Text fontSize="3xl" pt="2.5%" pl="1%"> {name == "" ? "All Topic" : name} </Text>
                    <Spacer />
                    <Image
                        type="Image"
                        src={PencilIcon}
                        borderRadius='full'
                        boxSize='10%'
                        cursor="pointer"
                        onClick={() => contextData.SetPost(-2)}
                        hidden={name == "" ? true : false}
                    />
                </Flex>
            </Box>
            <hr style={{
                backgroundColor: "black",
                height: 2,
                width: "95%"
            }} />
        </Box>
    );
}

function SocialHallContentTitle(props) {
    return (
        <div>
            <TitleComponent name={props.location} />
            <SocialHallContentBlock name={props.location} />            
        </div>
    );
}

function SocialHallContent() {
    const location = useLocation().pathname.slice(12);
    const contextData = useContext(InitContext);
    let content;
    
    if (contextData.poststate == -1)
        content = <SocialHallContentTitle location={location} />
    else if (contextData.poststate == -2)
        content = <SocialHallPostPage topic={location} />
    else
        content = <SocialHallResponse topic={location} id={contextData.poststate} />

    return (
        <Box
            backgroundColor="gray.100"
            h="auto"
            w="100%"
            borderRadius="30px"
            p="5%"
        >
            {content} 
                        
            
        </Box>

    );

}

export default SocialHallContent; 