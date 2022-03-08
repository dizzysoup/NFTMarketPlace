import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import FavoriteRank from "./FavoriteRank";
import Recommend from "./Recommend";
import TopSales from "./TopSales";
import TopCreator from "./TopCreator";
import NowSaling from "./NowSaling";


function HomePage() {
  return (    
      <Box mt="1%" ml="5%" w="100%" h="100%" >
        <Flex>
          <NowSaling />
          <Recommend />
        </Flex>
        <Flex>
          <FavoriteRank />
          <TopCreator />
        </Flex>
        <Box m="1%">
          <TopSales />
        </Box>
      </Box>    
  );

}

export default HomePage;