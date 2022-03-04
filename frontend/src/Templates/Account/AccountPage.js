import React from "react";
import AccountLayout from "./AccountLayout";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import CollectionPage  from "../Collection/CollectionPage" ; 
import CreatePage from "../DeployedNFT/CreatePage" ;
import TransactionPage from "../Transaction/TransactionPage";
import FavoritePage from "../Favorite/FavoritePage";
import { useEtherBalance } from "@usedapp/core";

function AccountPage(){        
    const option = useParams().option ;    
    const account = useParams().address ;    
    const etherBalance = useEtherBalance(account);   
    let children = [] ;  

    switch(option){
        case "Collection"  :
            children = <CollectionPage account = { account } /> ; 
            break ;
        case "Create" :
            children = <CreatePage /> ; 
            break ; 
        case "Transaction":
            children = <TransactionPage account = {account } /> ; 
            break ;        
        case "Favorite" :
            children = <FavoritePage account = { account } /> ; 
    }
   
    return(
        <Box >
            <AccountLayout account = { account } etherBalance = { etherBalance } />            
            { children }
        </Box>
    );
}

export default AccountPage;
