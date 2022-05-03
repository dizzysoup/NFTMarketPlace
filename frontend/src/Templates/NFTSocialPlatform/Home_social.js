import React, { Component , useState , useEffect , useContext } from "react";
import Content_social from "./Content_social";
import SocialLayout from "./SocialLayout";
import NFTCommunityHomePage from "./NFTCommunityHomePage";
import { Flex } from "@chakra-ui/react";
import { InitContext } from "../../App";

function Home_social(){
    const [content , SetContent ] = useState();
    const context_val = useContext(InitContext);
    
    useEffect(()=>{      
       if (context_val.layoutdata === null)
            SetContent(<NFTCommunityHomePage/>)
        else SetContent(<Content_social/>) 

        // SetContent(<Content_social/>)
    },[context_val.layoutdata])
    
   

    return(
        <Flex
                w="100%"
                h="100%"
                position="fixed"
                bg="gray.300"
            >
                <SocialLayout />
                { content }              
        </Flex>
    );
}

export default Home_social