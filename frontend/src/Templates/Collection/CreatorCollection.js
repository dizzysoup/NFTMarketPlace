import React, { useState, useEffect , useContext } from "react";
import { Text, Box, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CollectionCreatorList from "./CollectionCreatorList";
import { getContract } from '../../hook/NFTSmartContract';
import {InitContext } from "../../App" ;

async function CreatorNFT(account) {
    const contract = getContract();
    const eventOption = { fromBlock: 0 };
    const event = await contract.getPastEvents("Success", eventOption);
    let logtable = [];
    for (let i = 0; i < event.length; i++) {
        const val = event[i].returnValues; // 取得該事件的emit 回傳值
        if (val["CreateHash"] == account) {
            logtable.push(val);
        }
    }

    return logtable;
}

function CreatorCollection(props) {
    const [result, SetResult] = useState([]);
    const account = props.account;

    const contextdata = useContext(InitContext);

    useEffect(async () => {
        const logtable = await CreatorNFT(account);        
        SetResult(logtable);
    }, [account, contextdata.reload])

    return (
        <Box w="100%" h="100%">
            {result.length == 0 ?
                <Box>
                    <Text fontSize="4xl"> You Haven't Create NFT  </Text>
                    <Link to={"/AccountPage/Create/" + account}>
                        <Text fontSize="2xl" color="blue"
                            textDecoration="underline"
                        > Go To Create !  </Text>
                    </Link>
                </Box> : ""
            }
            {
                result.length != 0 ?
                <SimpleGrid spacing="10px" columns={2}>
                {result.length == 0 ? "" :
                    result.map((res, index) => {
                        return <CollectionCreatorList key={index} content={res} />
                    })
                }
                </SimpleGrid> : ""
            }            
        </Box>
    );
}


export default CreatorCollection;