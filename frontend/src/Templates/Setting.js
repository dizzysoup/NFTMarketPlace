import React, { useEffect, useState } from "react"
import { Text, Box, Flex, Spacer, Button, Input, Textarea, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import AddressIcon from "../Components/AddressIcon";

function SaveClick(username, interduction, email, account) {
    const postdata = {
        "account": account,
        "username": username,
        "interduction": interduction,
        "email": email
    }
    const url = "http://192.168.31.7:8000/api/account";
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(postdata)
    })
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

function Setting() {
    const { account, connectWallet } = useEthers();
    const [username, SetName] = useState();
    const [interduction, SetInterDuctuin] = useState(null);
    const [email, SetEmail] = useState(null);
    const [pfp, SetPFP] = useState(null);
    const link = '/AccountPage/Collection/' + account ;  
    useEffect(() => {
        const url = "http://192.168.31.7:8000/api/account/?account=" + account;
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then(res => {
                SetPFP(res[0].PFP)
                SetName(res[0].name)
                SetInterDuctuin(res[0].interduction)
                SetEmail(res[0].email)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Box
            w="100%"
            h="100%"
        >
            <Box
                p="5%"
                w="60%"
                h="100%"
                bg="gray.300"
                ml="20%"
                mt="2.5%"
                borderRadius="3xl"
            >
                <Box >
                    <Text fontSize="4xl" fontWeight="bold"> Profile Setting  </Text>
                    <Text fontSize="1xl"  > 個人化設定介面 </Text>
                </Box>
                <Flex mt="5%" w="80%">
                    <Box w="60%">
                        <Text fontSize="3xl"> Wallet Address </Text>
                        <Input
                            value={account}
                            bg="gray.400"
                            borderColor="black"
                            readOnly={true}
                        />
                        <Text fontSize="3xl" > User Name </Text>
                        <Input
                            placeholder="Enter UserName"
                            borderColor="black"
                            defaultValue={username}
                            onChange={(event) => { SetName(event.target.value); }}
                        />
                    </Box>
                    <Spacer />
                    <Box align="center" w="35%" ml="3%">
                        <Text fontSize="3xl"> PFP Image </Text>
                        <Box mt="4%">
                            {
                                pfp == null ?
                                <AddressIcon address={account} diameter={100} />
                                :
                                <Image w="60%" h="auto" borderRadius="full" src={pfp} />
                            }
                        </Box>
                    </Box>
                </Flex>
                <Text fontSize="3xl"> Interdouction </Text>
                <Textarea
                    placeholder="Enter your Interduction"
                    borderColor="black"
                    defaultValue={interduction}
                    onChange={(event) => { SetInterDuctuin(event.target.value) }} />
                <Text fontSize="3xl" > Email Address </Text>
                <Input
                    placeholder="Enter your email"
                    borderColor="black"
                    onChange={(event) => { SetEmail(event.target.value) }}
                    defaultValue={email}
                />
                <Box mt="5%">
                    <Link to={link}>
                        <Button onClick={() => SaveClick(username, interduction, email, account)} > Save  </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    );

}


export default Setting; 