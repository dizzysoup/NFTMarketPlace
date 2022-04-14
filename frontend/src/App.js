

import React, { useState, createContext } from 'react';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import Layout from './Components/Layout';
import RouterManager from './Components/RouterManager';
import { BrowserRouter } from 'react-router-dom';
import { DAppProvider } from "@usedapp/core";



export const InitContext = createContext({
  a: 1
});

function App() {  
  const [loginstate, SetLogin] = useState(0);
  const [poststate, SetPost] = useState(-1);
  const [page , ChangePage ] = useState(0) ; // 切換頁面
  const [responsestate, UpdateResponse] = useState(0);
  const [router , SetRouter ] = useState(null);
  const [reload , SetReLoad ] = useState(-1); // 重新載入頁面的變數
  const [val , SetVal ] = useState([]); // 填數據值
  
  return (
    <InitContext.Provider
      value={{
        loginstate,
        SetLogin,
        poststate,
        SetPost,
        responsestate,
        UpdateResponse,
        router,
        SetRouter,
        reload,
        SetReLoad,
        page ,
        ChangePage,
        val,
        SetVal
      }}
    >      
      <DAppProvider config={{}} >
        <ChakraProvider>
          <BrowserRouter>
            <Layout >
              <RouterManager />
            </Layout>
          </BrowserRouter>
        </ChakraProvider>
      </DAppProvider>
    </InitContext.Provider>
  );
}

export default App;
