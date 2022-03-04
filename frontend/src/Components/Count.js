import { Box, Flex, Text, Button, NumberInput, NumberInputField } from "@chakra-ui/react";
import { getJSON, useContractMethod, GetValue } from "../hook";
import { useState } from "react";


export default function Count(props) {

  const count = GetValue();
  const { state, send: incrementCount } = useContractMethod("incrementCount");
  const { state: setCountState, send: setCount } = useContractMethod("setCountAndColor");

  const [input, setInput] = useState("");

  function handleIncrement() {
    incrementCount();
  }

  function handleSetCount() {
    const count = parseInt(input);
    const rmcolor = props.rmcolor;
    if (count) {
      setCount(count, rmcolor);
    }
  }

  function handleInput(value) {
    setInput(value)
  }



  return (

    <Flex direction="column" align="center" mt="4">
      <Text color="black" fontSize="8xl">
        {count ? count.toString() : 0}
      </Text>
      <Text color = "black"  m="4px" >
        { props.rmcolor }
      </Text>
      <Button colorScheme="teal" size="lg" onClick={handleIncrement}>
        Increment
      </Button>
      <Box mt={4}>
        <NumberInput mb={2} min={1} value={input} onChange={handleInput} color="black" clampValueOnBlur={false} >
          <NumberInputField />
        </NumberInput>
        <Button isFullWidth colorScheme="purple" onClick={handleSetCount}>
          Set Count
        </Button>
      </Box>
    </Flex>
  );
}