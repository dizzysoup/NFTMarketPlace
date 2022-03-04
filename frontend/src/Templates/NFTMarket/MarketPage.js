import React, { Component, useState } from "react";
import { Text, Box, Flex } from "@chakra-ui/react";
import { Collapse, useDisclosure } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import NFTList from "./NFTList";

function MarketPage() {
    const [value, setValue] = useState('')
    const { isOpen, onToggle } = useDisclosure()
    return (
        <Box
            h="100%"
            w="100%"
            m="1%"                   
            position="absolute"    
        >
            <Box
                borderRadius="2xl"
                border="1px solid black"
                p="0.5%"
                w="95%"
                h="10%"
            >
                <Text fontSize="5xl"> NFT Explore </Text>
            </Box>
            <Flex h="100%" w="95%" mt="1%"  >
                <Box bg="gray.400" w="20%" h="100%" >
                    <Box
                        p="1%"
                        pl="5%"
                        w="100%"
                        h="7%"
                        borderColor="black"
                        borderStyle=" solid"
                        borderWidth="3px"
                    >
                        <Text fontSize="3xl" > Filter </Text>
                    </Box>
                    <Box
                        p="1%"
                        pl="5%"
                        w="100%"
                        h="7%"
                        borderColor="black"
                        borderStyle=" solid"
                        borderWidth="3px"
                        onClick={onToggle}
                        cursor="pointer"
                    >
                        <Text fontSize="3xl" > Topic </Text>
                    </Box>
                    <Collapse in={isOpen} animateOpacity >
                        <Box
                            p='40px'
                            color='white'
                            bg='teal.500'
                            rounded='md'
                            shadow='md'
                        >
                            <RadioGroup onChange={setValue} value={value}>
                                <Radio value=''> All </Radio>
                                <Flex mt = "3%" >
                                    <Radio value='PFP'> PFP </Radio>
                                    <Radio value='ArtWork ' pl="3%"> ArtWork </Radio>
                                </Flex>
                                <Flex mt="3%">
                                    <Radio value='Music'> Music </Radio>
                                    <Radio value='Game' pl="3%"  > Game </Radio>
                                </Flex>
                            </RadioGroup>
                        </Box>
                    </Collapse>
                    <Box>
                    </Box>
                </Box>

                <Box bg="gray.600" w="80%" h="100%" >
                    <NFTList topic = { value} />
                </Box>
            </Flex>
        </Box>
    );
}

export default MarketPage 