import React , {useContext } from "react";
import { InitContext } from "../App";


export default function InitizationContext(){
    const context_val = useContext(InitContext);   
    context_val.SetVal(null); // 數據初始化
    context_val.SetStatus(false); // 狀態初始化
    context_val.ChangePage(0); // 換頁初始化
    context_val.SetData(''); // 數據初始化
}