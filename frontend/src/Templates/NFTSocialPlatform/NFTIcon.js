import React, { useState , useEffect } from "react";
import {  Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getContract } from "../../hook/NFTSmartContract";
import AddressIcon from "../../Components/AddressIcon";



function CircleItem(props) {
    const linkstr = "/NFTSocial/" + props.address;

    const res = props === null ? "" :
        (<Box m="0.4%">
            <label
                style={{
                    cursor: "pointer",
                    textAlign: "center",
                }}
            >
                <Link to={linkstr} >
                    <AddressIcon diameter={100} address={props.address} />
                </Link>
            </label>
        </Box>)
    return res;
}

function NFTIcon(props) {
    const [res , setResult] = useState(null);
    const current_acc = props.account === undefined ?  "" : props.account;
  
    const contract = getContract();
    const eventOption = { fromBlock: 0 };

    useEffect(() => {
        contract.getPastEvents('BuySuccess', eventOption).then(
            v => {
                let acc_list = [];
                for (var i = 0; i < v.length; i++) {
                    const val = v[i].returnValues;
                    const creator_acc = val["creater"];
                    const user = val["user"];                   
                    if (user === current_acc && !acc_list.includes(creator_acc)) {
                        acc_list.push(creator_acc);
                    }
                }
                setResult(acc_list)
            }
        )
    }, [current_acc]);
    
    return (
        <div>
            {res === null ? "" :
                res.map((creator_acc, index) => {
                    return <CircleItem key={index} address={creator_acc}>{creator_acc} </CircleItem>
                })}
        </div>
    );
}




export default NFTIcon; 