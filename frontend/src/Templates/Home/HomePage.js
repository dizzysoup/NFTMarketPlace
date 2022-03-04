import React  from "react";
import {Box , Flex }  from "@chakra-ui/react";
import FavoriteRank from "./FavoriteRank";
import Recommend  from "./Recommend";
import TopSales from "./TopSales";
import TopCreator from "./TopCreator";


function HomePage() {
    
    return (
        <Box m = "6%" w= "100%" h = "100%" >
          <Recommend />
          <FavoriteRank /> 
          <Flex mt="5%" >
            <TopSales />
            <TopCreator />
          </Flex>
        </Box>

    );

}

export default HomePage;