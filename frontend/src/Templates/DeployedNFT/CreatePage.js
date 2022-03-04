import React, { Component } from "react";
import {
    Text, Flex, Box, Input, Image, HStack,
    NumberInput, NumberInputField, Spacer, Select
} from "@chakra-ui/react";
import DeployedNFTEvent from "./DeployedNFTEvent";

class CreatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topic: "",
            title: "",
            number: "",
            royalties: "",
            img: "",
            img_array: "",
            description: "",
            link : "",
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;        
        const value = event.target.value;
        this.setState({ [name]: value })
    }

    onChange = e => {
        const file = e.target.files.item(0);
        const fileReader = new FileReader();
        const imgfile = new FileReader();
        imgfile.readAsDataURL(file);
        imgfile.onload = () => {
            this.setState({ img: Buffer(imgfile.result) })
        }
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = () => {
            this.setState({ img_array: Buffer(fileReader.result) })
        }
    };

    render() {
        return (
            <Box
                bg="gray.300"
                w="60%"
                mt="2%"
                ml="20%"
                borderRadius="2xl"
                p="3%"
            >
                <Text
                    fontSize="3xl"
                    fontWeight="bold"
                > Create new item </Text>
                <Flex>
                    <Box>
                        <Text fontSize="2xl" mt="1%"> Topic  </Text>
                        <Select
                            onChange={this.handleChange}
                            placeholder="Choose Topic"
                            name="topic"
                        >
                            <option value='PFP'> PFP </option>
                            <option value='ArtWork'>ArtWork</option>
                            <option value='Music'> Music </option>
                            <option value='Game' > Game </option>
                        </Select>
                        <Text fontSize="2xl" mt="1%"> Name  </Text>
                        <Input
                            type="text"
                            placeholder=" NFT Name "
                            name="title"
                            background="gray.200"
                            onChange={this.handleChange}
                        />
                        <HStack
                            spacing="10px"
                            mt="2%"
                            p="1%"
                        >
                            <Text fontSize="2xl" > Price  </Text>
                            <NumberInput
                                type="text"
                                name="price"
                                width="20%"
                                background="gray.200"
                                borderRadius="5px"
                            >
                                <NumberInputField
                                    placeholder="0"
                                    onChange={this.handleChange}
                                />
                            </NumberInput>
                            <Text fontSize="2xl"> Number  </Text>
                            <NumberInput
                                type="text"
                                name="number"
                                width="20%"
                                background="gray.200"
                                borderRadius="5px"
                            >
                                <NumberInputField
                                    placeholder="0"                                   
                                    onChange={this.handleChange}
                                />
                            </NumberInput>
                        </HStack>
                        <Box p="1%">
                            <Text fontSize="2xl">  Royalties </Text>
                            <Flex width="80%">
                                <NumberInput
                                    type="text"
                                    name="royalties"
                                    width="100%"
                                    background="gray.200"
                                    borderRadius="5px"
                                >
                                    <NumberInputField
                                        placeholder="0"
                                        onChange={this.handleChange}
                                    />
                                </NumberInput>
                                <Spacer />
                                <Text fontSize="160%" ml="2%"  > % </Text>
                            </Flex>
                        </Box>
                    </Box>
                    <Box ml="40px" height="relative" p="1%">
                        <Text fontSize="2xl" mt="2%"> Upload Image </Text>
                        <label
                            style={{
                                cursor: "pointer",
                                textAlign: "center",
                            }}
                        >
                            <Input
                                type="file"
                                display="none"
                                onChange={this.onChange}
                                isRequired={true}
                            />
                            <Box
                                height="80%"
                            >
                                <Image
                                    boxSize="300px"
                                    fallbackSrc="https://via.placeholder.com/150"
                                    border="1px dashed #595656"
                                    borderRadius="10px"
                                    position="absoulate"
                                    src={this.state.img}
                                />
                            </Box>
                        </label>
                    </Box>
                </Flex>
                <Text fontSize="2xl">  Description </Text>
                <Input
                    placeholder="Enter the introduction"
                    height="150px"
                    name="description"
                    onChange={this.handleChange}
                />
                <Text fontSize="2xl">  Social Media / Profile Link </Text>
                <Input
                    placeholder="Personal website, Instragram, Twitter , etc. "
                    onChange={this.handleChange}
                    name="link"
                />

                <DeployedNFTEvent value = { this.state }/>
            </Box>
        );
    }
}

export default CreatePage;