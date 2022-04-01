import React, { Component } from "react";
import { Route } from "react-router-dom";
import Content_social from "./Content_social";
import SocialLayout from "./SocialLayout";
import NFTCommunityHomePage from "./NFTCommunityHomePage";
import { Box, Flex } from "@chakra-ui/react";

class Home_social extends Component {
    render() {
        return (
            <Flex
                w="100%"
                h="100%"
                position="fixed"
                bg="gray.300"
            >
                <SocialLayout />
                <NFTCommunityHomePage />
            </Flex>

        );
    }
}

export default Home_social