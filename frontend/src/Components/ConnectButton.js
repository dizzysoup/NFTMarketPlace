import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import { formatEther,formatUnits } from "@ethersproject/units";

export default function ConnectButton(){
    const {activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);

    return (
        <Box>
        <Text color="white" fontSize="md">
          <p> 帳戶名稱 : {account } </p>
          帳戶餘額 :  {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3) } ETH
        </Text>
      </Box>
    );
}
