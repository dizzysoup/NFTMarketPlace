/* eslint-disable react/jsx-pascal-case */
import React, {  useState } from "react";
import { useEthers } from "@usedapp/core";
import { Box, Flex, Input, Button } from "@chakra-ui/react";

import Get_ContentBlock from "./Get_ContentBlock";

function Content_Box(props) {
    const { ConnectWallet, account } = useEthers();
    const [count, setCount] = useState(0);
    const creator = props.creator;

    const insertstr = 'http://192.168.31.7:8000/api/social_insert';

    let textInput = React.createRef();


    let BtnClick = (e) => {
        const text = textInput.current.value;
        if (text !== '') {
            setCount(count + 1);
        }
        const data = {
            "creator": creator,
            "content": text,
            "member": account
        }

        textInput.current.value = '';
        if (text !== "") {
            fetch(insertstr, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json ",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            })
                .catch(error => console.log(error))
        }
    }


    const content_box =
        (
            <Box
                border="5px solid"
                borderColor="gray.300"
                bg="gray.800"
                borderRadius="5px"
                ml="4%"
                h="100%"
                w="95%"
            >
                <Box
                    h="90%"
                    w="100%"
                >
                    <Get_ContentBlock creator={creator} count={count} />
                </Box>
                <Box w="100%" h="9%" >
                    <Flex
                        align="center"
                        mr="1"
                        ml="1"
                    >
                        <Input
                            placeholder="Write Something "
                            fontSize="4xl"
                            bg="blue.800"
                            h="100%"
                            w="100%"
                            mr="1"
                            color="gray.400"
                            ref={textInput}
                            type="text"
                        />
                        <Button
                            onClick={BtnClick}
                        >
                            Enter
                        </Button>
                    </Flex>
                </Box>
            </Box>
        );

    return content_box;
}

export default Content_Box