import React, { Component, useState } from "react";
import { Text, Box, Flex, Checkbox, Select } from "@chakra-ui/react";
import { Collapse, useDisclosure } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import NFTList from "./NFTList";

const boxstyle = {
    mt: "3%",
    p: "1%",
    pl: "5%",
    w: "100%",
    h: "7%",
    borderColor: "black",
    borderRadius: "2xl",
    borderStyle: " solid",
    borderWidth: "3px",
}

const collapsestyle = {
    p: '40px',
    color: 'white',
    bg: 'teal.500',
    rounded: 'md',
    shadow: 'md',
}

function MarketPage() {
    const [value, setValue] = useState('') // nft 的 topic 
    const [statusItems, setStatusItems] = useState([true, true ]) // nft 的剩餘數量
    const [statusOpen, setSatusBlock] = useState(false);
    const { isOpen, onToggle: onTopic } = useDisclosure();
    const handleStatusBlock = () => setSatusBlock(!statusOpen); // 狀態block視窗
    const StatusAllCheck = statusItems.every(Boolean);
    const isIndeterminate = statusItems.some(Boolean) && !StatusAllCheck; // checkbox 當前狀態   
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
                <Box bg="gray.400" w="20%" h="100%" p="1%" >
                    <Box {...boxstyle} >
                       {/* <Select placeholder = 'Order by '>
                           <option value = 'time'> Deployed Time  </option>
                        </Select> */}
                        <Text fontSize="3xl" > Filter </Text>                        
                    </Box>
                    <Box>
                        <Box {...boxstyle}
                            onClick={onTopic}
                            cursor="pointer"
                        >
                            <Text fontSize="3xl" > Topic </Text>
                        </Box>
                        <Collapse in={isOpen} animateOpacity >
                            <Box {...collapsestyle}  >
                                <RadioGroup onChange={setValue} value={value}>
                                    <Radio value='' > All </Radio>
                                    <Flex mt="3%" >
                                        <Radio value='PFP'> PFP </Radio>
                                        <Radio value='ArtWork' pl="3%"> ArtWork </Radio>
                                    </Flex>
                                    <Flex mt="3%">
                                        <Radio value='Music'> Music </Radio>
                                        <Radio value='Game' pl="3%"  > Game </Radio>
                                    </Flex>
                                </RadioGroup>
                            </Box>
                        </Collapse>
                    </Box>
                    <Box>
                        <Box {...boxstyle}
                            onClick={handleStatusBlock}
                            cursor="pointer"
                        >
                            <Text fontSize="3xl" >Status </Text>
                        </Box>
                        <Collapse in={statusOpen} >
                            <Box {...collapsestyle}  >
                                <Checkbox
                                    isChecked={StatusAllCheck}
                                    isIndeterminate={isIndeterminate}                                  
                                    onChange={e => setStatusItems([e.target.checked, e.target.checked])}
                                > All </Checkbox>
                                <Box>
                                    <Checkbox
                                        isChecked={statusItems[0]}
                                        onChange={e => setStatusItems([e.target.checked, statusItems[1]])}
                                    > OnSale </Checkbox>
                                    <Checkbox
                                        ml = "5%"
                                        isChecked={statusItems[1]}
                                        onChange={e => setStatusItems([statusItems[0], e.target.checked])}
                                    > SoldOut </Checkbox>
                                </Box>

                            </Box>
                        </Collapse>
                    </Box>
                </Box>

                <Box bg="gray.600" w="80%" h="100%" >
                    <NFTList topic={value} status = { statusItems } />
                </Box>
            </Flex>
        </Box>
    );
}

export default MarketPage 