import { Flex, Text, Box, Button, HStack, Image } from "@chakra-ui/react";
import AddressIcon from "../../Components/AddressIcon";
import { formatEther } from '@ethersproject/units'
import { Link } from "react-router-dom";
import React, { useEffect, useState , useContext } from "react";
import { InitContext } from "../../App" ;

function PersonalProfile(props) {
    const account = props.account;
    const [name, setName] = useState();
    const [date, setDate] = useState();
    const [pfp, setPFP] = useState();
    const contextData = useContext(InitContext);
    const etherBalance = props.etherBalance;
    const connstr = 'http://192.168.31.7:8000/login?account=' + account;
    useEffect(() => {
        fetch(connstr, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setName(data[0].name)
                setDate(data[0].InjoinDate)
                setPFP(data[0].PFP)
            })
            .catch(e => { console.log(e) })
    }, [contextData.reload])

    return <Flex
        mt="5"
        mr="30px"
        flexDirection="column"
        alignItems="center"
    >
        {
            pfp == null ?
                <AddressIcon address={account} diameter={100} />
                :
                <Image w="150px" h="auto" borderRadius="full" src={pfp} />
        }

        <Box align="center">
            <Text fontSize="30px" mt="5.5">
                {name}
            </Text>
            <Text fontSize="20px" mt="5.5">
                {account}
            </Text>

            <Text fontSize="25px" mt="5.5">
                {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
            </Text>
            <Text fontSize="20px" mt="5.5" color="gray.500" fontWeight="bold" > Joined {date} </Text>
        </Box>

    </Flex>


}



function AccountLayout(props) {
    const account = props.account;
    const etherBalance = props.etherBalance;
    const accountlink = "/AccountPage/Collection/" + account;
    const createlink = "/AccountPage/Create/" + account;
    const transactionlink = "/AccountPage/Transaction/" + account;
    const favoritelink = "/AccountPage/Favorite/" + account ;
    return (
        <Box>
            <Box h="290px" bg="gray.200">
                <Flex justifyContent="center">
                    <PersonalProfile account={account} etherBalance={etherBalance} />
                </Flex>
            </Box>
            <Box h="30px"  >
                <Flex justifyContent="center">
                    <Box
                        w="830px"
                        h="50px"
                    >
                        <Flex justifyContent="ceneter">
                            <HStack spacing="24px" m="1.5">
                                
                                <Link to={accountlink}>
                                    <Button bg="gray.300" w="150px" color="gray.600">
                                        Collection
                                    </Button>
                                </Link>
                                <Link to={createlink}>
                                    <Button bg="gray.300" w="150px" color="gray.600">
                                        Create
                                    </Button>
                                </Link>
                                <Link to={transactionlink} >
                                    <Button bg="gray.300" w="150px" color="gray.600"> Transaction  </Button>
                                </Link>
                                <Link to={ favoritelink }>
                                    <Button bg="gray.300" w="150px" color="gray.600"> Favorite </Button>
                                </Link>
                            </HStack>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}

export default AccountLayout

