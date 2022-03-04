import React, { useRef} from "react";
import { useToast , Button  } from "@chakra-ui/react";

function ToastEx() {
  const toast = useToast()
  const toastIdRef = useRef() 

  const toastmsg = (
    toastIdRef.current = toast({ 
      status : 'success',
      description: 'Deployed Success!!'             
    })
  )

  return(<Button onClick={() => toastmsg}>
      Toast Example
  </Button>);
}



export default function  TestingPage(){
  return(
    <ToastEx />
  );
} ; 