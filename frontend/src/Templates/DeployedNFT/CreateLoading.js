import React, { useState, useEffect, useContext } from "react";
import { InitContext } from "../../App";
import QrCode from "qrcode.react";
import { useParams , useHistory } from "react-router-dom";
import { Box, Progress, Image, Text, Flex, HStack , Button } from "@chakra-ui/react";
import IPFS from "../../Images/IPFS.png";
import lock from "../../Images/lock.png";
import ganache from "../../Images/ganache.png";
import databases from "../../Images/databases.png";
import sha256 from "../../Components/Crypto";
import { create } from "ipfs-http-client";
import { useContractMethod } from "../../hook/NFTSmartContract";
import { downloadQRCode } from "../../Components/Qrcode";


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

const QrCodeStyle = {
    boxSize: "300px",
    border: "1px dashed #595656",
    borderRadius: "10px",
}

//上傳到IPFS
async function DeployedIPFS(value) {
    let str = "";
    const data = value.array;
    const ipfs = create({
        host: 'localhost',
        port: '5001',
        protocol: 'http'
    });
    await ipfs.add(data)
        .then((res) => { str = 'https://ipfs.io/ipfs/' + res.path; });
    return { "ipfs": str, "val": 20 };
}
// SHA256 加密
async function Crypto(value) {
    const crypto_hash = sha256(value);
    return { "hash": crypto_hash, "val": 45 }
}
// 故意等待秒數 
async function wait(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
};

//寫入資料庫
async function InsertDataBase(formVal, address, ipfs) {

    //NFT_Table 
    const postdata = {
        "title": formVal.name,
        "creator": address,
        "topic": formVal.topic,
        "ipfs": ipfs,
        "description": formVal.description,
        "price": formVal.price,
        "number": formVal.number,
        "royalties": formVal.royalties
    }
    const connstr = "http://192.168.31.7:8000/api/nft";
    await fetch(connstr, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(postdata)
    }).catch(function (res) { console.log(res) })

    // Transaction_table 
    const url = "http://192.168.31.7:8000/api/trans"
    const data = {
        "event": "Minted",
        "price": formVal.price,
        "fromhash": "SmartContract",
        "tohash": address
    }
    await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    }).catch(function (res) { console.log(res) })


}

function CreateLoading(props) {
    const { state, send: deployedNFT } = useContractMethod("DeployedNFT");
    const context_val = useContext(InitContext);
    const address = useParams().address;
    const formVal = context_val.val.formVal;
    const img = context_val.val.img;
    const [val, SetVal] = useState(0);
    const [timer, SetTimer] = useState(0);
    const [count, SetCount] = useState(0);
    const [qrcode, SetQrcode] = useState('');
    const path = useHistory();

    //計時器
    useEffect(() => {
        let Id = setInterval(() => {
            SetTimer((prev) => {
                if (prev >= val) {
                    SetCount(count + 1);
                    clearInterval(Id);
                }
                return prev + 1;
            })
        }, 30);
    }, [val])

    useEffect(async () => {
        const r1 = await DeployedIPFS(img); // 上傳
        SetVal(r1.val);
        await wait(2000);
        const r2 = await Crypto(r1.ipfs + address); // 加密
        SetVal(r2.val);
        await wait(2000);
        await deployedNFT(formVal.name, formVal.price, formVal.number, formVal.topic, formVal.royalties, formVal.description, r1.ipfs, r2.hash); // 上鏈
        SetVal(70);
        await wait(2000);
        await InsertDataBase(formVal, address, r1.ipfs); // 插入資料庫中
        SetVal(100);
        await wait(1000);
        SetQrcode(r2.hash);
    }, [])

    return (
        <Box {...BackgroundStyle}>
            <Text fontSize="5xl">  鑄造NFT</Text>
            <Flex mt="2%">
                <Box>
                    <HStack spacing='35px' >
                        <Flex flexDirection="column" align="center" w="20%" >
                            <Image boxSize={150} src={IPFS} />
                            <Text {...FontStyle}> 上傳IPFS </Text>
                        </Flex>
                        <Flex flexDirection="column" align="center" w="20%" >
                            <Image boxSize={150} src={lock} />
                            <Text {...FontStyle}>  資料雜湊 </Text>
                        </Flex>
                        <Flex flexDirection="column" align="center" w="20%" >
                            <Image boxSize={150} src={ganache} />
                            <Text {...FontStyle}>  上鏈 </Text>
                        </Flex>
                        <Flex flexDirection="column" align="center" w="20%" >
                            <Image boxSize={150} src={databases} />
                            <Text {...FontStyle}>  存放資料庫 </Text>
                        </Flex>
                    </HStack>                    
                    <Progress value={timer} mt="2%" />
                    <Flex 
                        h = "100px"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >                        
                    { qrcode === '' ? 
                        <Button bg= "gray"> 鑄造中 </Button> : 
                        <Button bg="green" onClick={()=>path.push('/MarketPage/')} > 前往商店 </Button> 
                    }   
                    </Flex>
                </Box>

                <Box ml="5%">
                    <Text {...FontStyle}> 會員卡 QRcode </Text>
                    <Box {...QrCodeStyle} 
                        onClick={()=>downloadQRCode(qrcode)}
                        cursor="pointer"
                    >
                        {qrcode === '' ? '' :                                
                            <QrCode
                                id = "qrcode"
                                value={qrcode}
                                size={300}
                                fgColor="#000000"                                
                            />
                        }
                    </Box>

                </Box>
            </Flex>
        </Box>
    );
}


export default CreateLoading;