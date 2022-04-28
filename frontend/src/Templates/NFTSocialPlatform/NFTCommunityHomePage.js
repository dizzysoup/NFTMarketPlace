import React, { useState, useContext, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { Box, Flex, Text, Button, Image, Input, Progress } from "@chakra-ui/react";
import { InitContext } from "../../App";
import { getContract } from "../../hook/NFTSmartContract";
import ganache from "../../Images/ganache.png";
import NFTLoginCheck from "./NFTLoginCheck";
import InitizationContext from "../../Components/InitizationContext";
import QrCodeScan from "../../Components/QrCodeScan";
import { useEthers } from "@usedapp/core";
import { CheckCircleIcon , CloseIcon } from "@chakra-ui/icons";

const boxstyle = {
    bg: "gray.800",
    w: "80%",
    h: "80%",
    borderRadius: "3xl",
    borderColor: "gray.300",
    borderWidth: "4px",
    borderStyle: "solid",
    pl: "5%"
}

// 0xCommunity 主要頁面
function NFTCommunityHomePage() {
    const path = useParams();
    const context_val = useContext(InitContext);

    //初始化
    if (path.id === 'home') InitizationContext();

    return (
        <Flex
            w="100%"
            h="100%"
            bg="gray.700"
            justifyContent="center"
            align="center"
        >
            {
                path.id === 'home' ? <WelcomeBlock /> :
                    context_val.page === 1 ? <LoginCheck /> : <QRLoginBlock />
            }
        </Flex>
    );
}

// 0xCommunity 歡迎頁面
function WelcomeBlock() {
    return (
        <Box {...boxstyle}>
            <Box>
                <Text
                    fontSize="9xl"
                    color="gray.300"
                >
                    Welcome  </Text>
                <Text
                    fontSize="9xl"
                    color="gray.300"
                > 0xCommunity  </Text>
            </Box>

            <Box>
                <Text color="gray.300"
                    fontSize="3xl"
                > NFT Community </Text>
                <Text color="gray.300"> 進入 NFT 專屬社群</Text>
                <Box
                    mt="1%"
                    color="blue.400"
                    fontSize="3xl"
                > 從區塊鏈讀取項目 </Box>
            </Box>
            <NFTProduct />
        </Box>

    );
}

// QRcode 驗證登入介面
function QRLoginBlock() {
    const context_val = useContext(InitContext);
    const InputEvent = async (e) => {
        QrCodeScan(e, context_val);
    }
    return (
        <Box {...boxstyle} >
            <Flex alignItems="center" w="100%" h="100%">

                <Image boxSize="350px" borderRadius="3xl" src={context_val.val.IpfsHash} />
                <Flex ml="5%" flexDirection="column" justifyContent="center" w="100%">
                    <Text color="white" fontSize="5xl"> Welcom to  "{context_val.val.Name}" Community !</Text>
                    <Box>
                        <Text color="white" fontSize="4xl"> Verify and Login : </Text>
                        <Text color="white" fontSize="1xl"> QrCode + MetaMask address  </Text>
                    </Box>
                    <Text mt="5%" color="white" fontSize="2xl">Choose your Qrcode </Text>
                    <Input w="50%" type="file" accept=".jpg, .png" onChange={e => InputEvent(e)} color="white" />
                    {context_val.data === "" ?
                        <Button w="50%" color="black" mt="5%" >驗證</Button>
                        : <Button onClick={() => context_val.ChangePage(1)} w="50%" bg="green.600" mt="5%" >驗證</Button>
                    }
                </Flex>
            </Flex>
        </Box>
    );

}

//QRcode 驗證登入中
function LoginCheck() {
    const context_val = useContext(InitContext);
    const { astiveWallect, account } = useEthers();
    const [status, SetStatus] = useState(0);

    useEffect(async () => {
        await wait(3000);
        const res = await NFTLoginCheck(context_val.data, account); //確認驗證狀態 
        SetStatus(res);
    }, []);
    let res;
    // 故意等待秒數 
    async function wait(ms) {
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    };

    switch (status) {
        case 2 :
            res = (<Box>
                <CheckCircleIcon color="green" w="200px" h="200px" />
                <Text fontSize="3xl" color="white" ml="12%"> 驗證成功 </Text>
                <Text fontSize="1xl" color="gray.300" ml="15%"> NFT 創作者 WelCome! </Text>
                <Progress mt="5%" value={100} />
            </Box>); break;
        case 1:
            res = (<Box>
                <CheckCircleIcon color="green" w="200px" h="200px" />
                <Text fontSize="3xl" color="white" ml="10%"> 驗證成功 </Text>
                <Text fontSize="1xl" color="gray.300" ml="15%"> NFT 會員 WelCome! </Text>
                <Progress mt="5%" value={100} />
            </Box>); break;
        case 0:
            res = (<Box>
                <Image boxSize="200px" src={ganache} />
                <Text fontSize="3xl" color="white" ml="6%"> 區塊鏈驗證中 </Text>
                <Text fontSize="1xl" color="gray.300" ml="15%"> 錢包位址+加密訊息</Text>
                <Progress mt="5%" isIndeterminate />
            </Box>);break;
        case -1 :
            
            res = (<Box>
                <CloseIcon color="red" w="200px" h="200px" />
                <Text fontSize="3xl" color="white" ml="10%"> 驗證失敗 </Text>
                <Text fontSize="1xl" color="gray.300" ml="10%"> 請確認你的錢包位址以及會員通行證 </Text>
                <Progress mt="5%" value={100} />
            </Box>); break;
    }

    return (
        <Box {...boxstyle}>
            <Flex h="100%" justifyContent="center" align="center" flexDirection="column">
                {res}
            </Flex>
        </Box>);
}

// NFT 項目從Blockchain 撈取
function NFTProduct() {
    const contract = getContract();
    const eventOption = { fromBlock: 0 };
    const [res, SetResult] = useState([]);
    useEffect(async () => {
        const event = await contract.getPastEvents('Success', eventOption);
        let table = [];
        for (let i = 0; i < event.length; i++) {
            const val = event[i].returnValues; // 合約回傳的val           
            table.push(val);
        }
        SetResult(table);
    }, [])
    return (
        <Flex>
            {
                res.map((res, index) => {
                    return <NFTBlock content={res} />
                })
            }
        </Flex>
    );
}

// NFT項目細節
function NFTBlock(props) {
    const path = useHistory();
    const context_val = useContext(InitContext);
    const content = props.content;
    const url = "/NFTSocial/" + content.ID;
    return (
        <Box
            m="1%"
            cursor="pointer"
        >
            <Image boxSize="150px" borderRadius="3xl"
                onClick={() => {
                    path.push(url);
                    context_val.SetVal(content);
                }}
                src={content.IpfsHash} />
        </Box>
    );
}

export default NFTCommunityHomePage; 