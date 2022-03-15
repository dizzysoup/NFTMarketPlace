import React, { useState, useEffect , useContext } from 'react';
import { Text, Box, Image, Flex, Button, Spacer } from "@chakra-ui/react";
import { getContract } from '../../hook/NFTSmartContract';
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper
} from '@chakra-ui/react';
import { InitContext } from "../../App" ; 



async function CollectCheck(account){
    const contract = getContract();    
    const eventOption = {fromBlock : 0 };
    const event = await contract.getPastEvents("BuySuccess", eventOption);
    let logtable = [];
    for(let i = 0 ; i < event.length ; i++){        
        const val = event[i].returnValues ; 
        if (val["user"] == account ){
            logtable.push(val);
        }      
    }
    return logtable ;    
}

async function CollectionTable(account){
    const url = "http://192.168.31.7:8000/api/collection/?account=" + account ; 
    let collecttable = [];
    await fetch(url , {method : 'GET'})
        .then(res => res.json())
        .then(res => collecttable.push(res));
    
    return collecttable
}


function ResellBtn(address , id , price){
   
   const data = {
       address : address,
       nft_id : id , 
       price : price 
   }
   const url = "http://192.168.31.7:8000/api/resell/";
   fetch(url, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(data)
    })
    .then(function (res) { 
        console.log(res); 
       })
    .catch(function (res) { console.log(res) })    
}


function CollectNFTList(props){
    const [result , SetResult ] = useState(0);   
    const content = props.content ; 
    const [val , SetPriceValue ] = useState(content.price+1);
    const contextdata = useContext(InitContext);
    return (
        <Box 
            p="0.5%" 
            cursor="pointer"
            bg = {result == 1 ? "gray.500" : "gray.400"}
            onMouseEnter={() => {SetResult(1)}}
            onMouseLeave={() => {SetResult(-1)}}            
        >
            <Flex>
                <Box w = "100%">
                    <Text fontSize="3xl"> {content.title} </Text>
                    <hr />
                </Box>
                { result != 1 ? "" : 
                <Box 
                    w= "300px" 
                    h = "300px" 
                    ml ="5%" bg = "gray.600" position="absolute" p = "1%" align = "center"
                >
                    <Flex>
                        <Image boxSize="50%" src = {content.ipfs} />
                        <Box ml = "3%" justifyItems="center" align = "left">
                            <Text color = "white" fontSize="2xl" > Buy Price  </Text>
                            <Text color = "white" fontSize="2xl"  > {content.price } ETH </Text>
                        </Box>                      
                    </Flex>
                    <Text color = "white" fontSize="2xl" align = "left" > Resell  </Text>
                    <NumberInput 
                        defaultValue={content.price+1} 
                        value = {val}
                        min = {content.price+1} 
                        color = "white" 
                        onChange={e => SetPriceValue(e)}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Flex  align = "center" mt = "4%">
                        <Spacer />
                        <Button onClick={()=> SetPriceValue(content.price+1)}> Reset  </Button>
                        <Button ml = "1%" onClick={()=> {
                            ResellBtn(content.address, content.id ,val );
                            contextdata.SetReLoad( contextdata.reload + 1 );
                        }}> Sell  </Button>
                    </Flex>
                </Box> }
            </Flex>
        </Box>
    );
}

function ResellLayout(props){
    const [result , SetResult] = useState([]);
    const account = props.account   

    const conxtdata = useContext(InitContext);

    useEffect(async() => {
        const logtable = await CollectCheck(account); 
        const databasetable = await CollectionTable(account);
        let resultatable = [];
        for(let i = 0 ; i< databasetable[0].length ; i ++ ){
            const data_id = databasetable[0][i].id ;
            let val = 0 ;
            for(let j = 0 ; j < logtable.length;j++){
                const log_id = logtable[j]._id
                if (data_id == log_id){
                    val = 1;
                    break ; 
                }                
            }    
            if(val == 1 ) resultatable.push(databasetable[0][i]);
        }        
        if (resultatable == [] )
            SetResult(null);
        else 
            SetResult(resultatable);
    } , [conxtdata.reload])

    return (
        <Box 
            bg = "gray.400"
            w = "20%"
            h = "100%"
            p = "1%"
        >   
            <Text fontSize="4xl"> Your NFT </Text>
            <hr />
            {
                result.length === 0 ? "" : 
                result.map((res , index )=> {
                    return <CollectNFTList  content = {res} key = {index} />
                })
            }
        </Box>
    );
}

export default ResellLayout ; 