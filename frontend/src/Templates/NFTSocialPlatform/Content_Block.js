import { Box, Text, Flex } from "@chakra-ui/react";
import React from "react";
import AddressIcon from "../../Components/AddressIcon" ;

function Content_Block(props) {
    const id = props.data.id
    const creator = props.data.creator
    const content = props.data.content
    const member = props.data.member
    const date = props.data.date

    return (
        <Box bg="gray.800" mt="1%" height="25%">
            <hr />
            <Flex h="100%">
                <Box w="10%" p="2">
                    <AddressIcon address={member} diameter={90} />
                    <Text color="white" fontSize="2xl" ml="1.5"> {member.toString().slice(0, 6)} </Text>
                </Box>
                <Box w="100%" ml="3">
                    <Box bg="gray.600">
                        <Text color="white" ml="90%">{date}</Text>
                    </Box>
                    <Box h="80%" mt="3">
                        <Text
                            color="white"
                        > {content} </Text>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}


export default Content_Block;