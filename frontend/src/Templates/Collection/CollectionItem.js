import React, { useState, useEffect } from 'react';
import { Text} from "@chakra-ui/react";
import { getContract } from '../../hook/NFTSmartContract';
import Slider from 'react-slick';
import CollectionItemDetail from "./CollectionItemDetail" ; 

async function CollectCheck(account){
    const contract = getContract();    
    const eventOption = {fromBlock : 0 };
    const event = await contract.getPastEvents("BuySuccess", eventOption); // 

    let logtable = [];
    for(let i = 0 ; i < event.length ; i++){        
        const val = event[i].returnValues ; // 取得該事件的emit 回傳值
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


function CollectionItem(props){
    const [ result , SetResult ] = useState([]);
    const account = props.account ;    
    
    useEffect(async() =>{        
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
    },[account]);

    const settings = {
        customPaging: i => (
            <div
              style={{
                width: "30px",
                color: "blue",
                border: "1px blue solid"
              }}
            >
              {i + 1}
            </div>
          ),
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    
    return result.length == 0 ? (
        <Text 
            fontSize="5xl"       
            align="center"  
        > No items to display  </Text>
    ) : (
        <Slider {...settings} > 
            {               
                result.map((res, index) => {                    
                    return <div>
                        <CollectionItemDetail  key = {index} content = {res} />
                    </div>
                })
            }            
        </Slider>
    );
}

export default CollectionItem 