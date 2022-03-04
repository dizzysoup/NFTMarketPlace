import React, { useEffect, useState } from "react";
import { Text, Box, Flex } from "@chakra-ui/react";
import AddressIcon from "../../Components/AddressIcon";

function MemberBlock(props) {
    const buyhash = props.buyhash;
    return (
        <Flex align="center" mt="3%">
            <AddressIcon address={buyhash} diameter={50} />
            <Text color="white" ml="3%"> {buyhash.slice(0, 6)} </ Text>
        </Flex>
    );
}

function GetMember(props) {
    const [result, setResult] = useState(null);
    const creator = props.creator;
    const connstr = "http://192.168.31.7:8000/api/trans_acc/?creator=" + creator;
    const NotEnter = creator === "" ? <Text color="gray.500"> You Haven't Enter Socail Room </Text> : "";

    useEffect(() => {
        fetch(connstr, { method: 'GET' }).then(res => res.json())
            .then(res => {
                setResult(res)
            })
    }, [creator])

    return (
        <Box>
            {
                result === null ?
                    "" :
                    result.map((res, index) => {
                        const buyhash = res["buyhash"];
                        return (
                            <MemberBlock key={index} buyhash={buyhash} />
                        );
                    })
            }
            {NotEnter}
        </Box>
    )
}


function CreatorBlock(props) {
    const creator = props.creator;
    const res = creator === "" ?
        <Text color="gray.500"> You Haven't Enter Socail Room </Text>
        : (
            <Flex align="center" mt="3%">
                <AddressIcon address={creator} diameter={50} />
                <Text color="white" ml="3%"> {creator.slice(0, 6)} </ Text>
            </Flex>
        )
    return res;
}

function Member_block(props) {
    const creator = props.creator === "home" ? "" : props.creator;
    return (
        <Box ml="3%" mt="4%" w="55%">
            <Text color="white"> Creator </Text>
            <hr />
            <CreatorBlock creator={creator} />
            <Text color="white" mt="3%"> Member </Text>
            <hr />
            <GetMember creator={creator} />
        </Box>

    );
}

export default Member_block; 