import React, { useCallback, useState , useContext } from "react";
import { InitContext } from "../../App";
import {
    Text, Flex, Box, Input, Image, HStack,
    NumberInput, NumberInputField, Select, Button,Textarea,
    FormControl, FormLabel
} from "@chakra-ui/react";

const BackgroundStyle = {
    bg: "gray.300",
    w: "60%",
    mt: "2%",
    ml: "20%",
    borderRadius: "2xl",
    p: "3%"
}
const FontStyle = {
    fontSize: "2xl",
    mt: "1%"
}
const StackStyle = {
    spacing: "10px",
    mt: "2%",
    p: "1%"
}
const ImageStyle = {
    boxSize: "300px",
    fallbackSrc: "https://via.placeholder.com/150",
    border: "1px dashed #595656",
    borderRadius: "10px",
}
const InputStyle = {   
    background: "gray.200",
    borderRadius: "5px"
}

// 自訂義 Hook 
function useFormVal(initial = {}) {
    const [state, saveState] = useState(initial);
    const setState = useCallback((newState) => {
        saveState(prev => ({ ...prev, ...newState }))
    }, [])
    return [state, setState];
}

function FormPage() {

    const context_val = useContext(InitContext);

    const [formVal, SetformVal] = useFormVal({ topic: '', name: '', price: '', number: '', royalties: '', description : ''})
    const [img , SetImage ] = useFormVal({url:'', array:''})
    function ChkVal() {
        if (formVal.topic !== '' && formVal.name !== '' 
            && formVal.price !== '' && formVal.number !== '' 
            && formVal.royalties !== '' && img.url != '') {
            context_val.SetVal({formVal , img});
            context_val.ChangePage(1);            
        } else {
            alert('請確認表單填寫正確');
        }
    }

    const decodeImage = e => {        
        const file = e.target.files.item(0);
        const fileReader = new FileReader();
        const imgfile = new FileReader();
        imgfile.readAsDataURL(file);
        imgfile.onload = () => {
           SetImage({url:Buffer(imgfile.result)})           
        }
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = () => {
            SetImage({array:Buffer(fileReader.result)})        
        }
    }

    return (
        <Box {...BackgroundStyle}>
            <Text fontSize="5xl"> Create New Item  </Text>

            <Flex justifyContent="space-around" w="100%" mt="3%">
                <Box w="45%">
                    <FormControl isInvalid={formVal.topic === ''} isRequired >
                        <FormLabel htmlFor="Topic" {...FontStyle}> Topic </FormLabel>
                        <Select
                            placeholder="Choose Topic"
                            onChange={(e) => SetformVal({ topic: e.target.value })}
                        >
                            <option value="PFP"> PFP </option>
                            <option value="ArtWork"> ArtWork</option>
                            <option value="Music"> Music </option>
                            <option value="Game"> Game </option>
                        </Select>
                    </FormControl>
                    <FormControl isInvalid={formVal.name === ''} isRequired >
                        <FormLabel htmlFor="Name" {...FontStyle}> Name  </FormLabel>
                        <Input type="text" placeholder=" NFT Name "
                            background="gray.200" onChange={(e) => SetformVal({ name: e.target.value })} />
                    </FormControl>
                    <HStack {...StackStyle} >
                        <FormControl isInvalid={formVal.price === ''} isRequired>
                            <FormLabel htmlFor="Price" {...FontStyle}> Price </FormLabel>
                            <NumberInput type="text" {...InputStyle}  >
                                <NumberInputField placeholder="0" onChange={(e) => SetformVal({ price: e.target.value })} />
                            </NumberInput>
                        </FormControl>
                        <FormControl isInvalid={formVal.number === ''} isRequired >
                            <FormLabel htmlFor="Number" {...FontStyle}> Number </FormLabel>
                            <NumberInput type="text" {...InputStyle}>
                                <NumberInputField placeholder="0" onChange={(e) => SetformVal({ number: e.target.value })} />
                            </NumberInput>
                        </FormControl>
                    </HStack>
                    <FormControl isInvalid={formVal.royalties === ''} isRequired>
                        <FormLabel htmlFor="Royalties" {...FontStyle}> Royalties </FormLabel>
                        <Flex width="80%">
                            <NumberInput type="text" {...InputStyle} >
                                <NumberInputField placeholder="0" onChange={(e) => SetformVal({ royalties: e.target.value })} />
                            </NumberInput>                            
                            <Text fontSize="160%" ml="2%"  > % </Text>
                        </Flex>
                    </FormControl>
                </Box>                
                <FormControl isInvalid={img.url === ''} isRequired w="45%" >
                    <FormLabel htmlFor="Image" {...FontStyle}> Upload Image </FormLabel>
                    <Flex flexDirection="column" align="center">                       
                        <Input type="file" onChange={(e) => decodeImage(e) }  />
                        <Image {...ImageStyle} src={img.url} mt="5%" />
                    </Flex>
                </FormControl>
            </Flex>
            <Text {...FontStyle} mt="2%" > Description </Text>
            <Textarea placeholder="Enter the introduction" 
                height="150px" onChange={(e)=> SetformVal({description:e.target.value})}/>
                
            <Button
                onClick={() => ChkVal()} mt="5%" w="100%"
            > Deployed !</Button>
        </Box>
    )
}

export default FormPage;