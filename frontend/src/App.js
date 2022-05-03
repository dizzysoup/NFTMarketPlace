

import React, { useState, createContext } from 'react';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import Layout from './Components/Layout';
import RouterManager from './Components/RouterManager';
import { BrowserRouter } from 'react-router-dom';
import { Mainnet,DAppProvider } from "@usedapp/core";


const config = {
  readOnlyChainId:Mainnet.chainId,
  readOnlyUrls : {
    [Mainnet.chainId] :"http://127.0.0.1:7545",
  }
}

export const InitContext = createContext({
  a: 1
});

function App() {  
  const [loginstate, SetLogin] = useState(0); // 登入狀態，如果切換帳號，則會變回0
  const [poststate, SetPost] = useState(-1);
  const [page , ChangePage ] = useState(0) ; // 切換頁面
  const [responsestate, UpdateResponse] = useState(0);
  const [router , SetRouter ] = useState(null);
  const [reload , SetReLoad ] = useState(-1); // 重新載入頁面的變數
  const [status , SetStatus ] = useState(false); // 全域狀態變數
  const [val , SetVal ] = useState([]); // 填數據值
  const [ data , SetData ]  = useState(''); //填數據值
  const [layoutdata , SetLayoutData ] = useState(null); // 存放於layout的資料
  
  return (
    <InitContext.Provider
      value={{
        loginstate,SetLogin,
        poststate,SetPost,
        responsestate,UpdateResponse,
        router,SetRouter,
        reload,SetReLoad,
        page ,ChangePage,
        val,SetVal,
        status,SetStatus,
        data,SetData,
        layoutdata,SetLayoutData        
      }}
    >      
      <DAppProvider config={config} >
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
