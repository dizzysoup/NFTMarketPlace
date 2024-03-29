import React, { useState } from "react";
import  jsQR from 'jsqr';
import QrCode from "qrcode.react";
import { Input } from "@chakra-ui/react";


function TestingPage() {
  const [ msg , SetText ] = useState(null);
  const [qrcode , SetQrcode ] = useState(null);

  const QrCodeScan = async(e) => {    
    const file = e.target.files.item(0);
 
    const imgfile = new FileReader();
    imgfile.readAsDataURL(file);
    imgfile.onload = async() => {
      const image = new Image();
      image.src = imgfile.result;
      await new Promise(res => image.addEventListener('load', res));
      
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');

      context.imageSmoothingEnabled = false ;
      context.drawImage(image , 0,0);
      const imageData = context.getImageData(0,0,image.width,image.height);    
      
      const code = jsQR(imageData.data, image.width , image.height);
      SetText(code.data);
    }

  }
  return(
  <div>
    <Input type = "text"  onChange = {(e) => SetQrcode(e) }/>    
    <QrCode 
      value = { qrcode }
      size = {200}
      fgColor = "#000000"
    />
    <h1> { msg}</h1>
    <Input type="file"  onChange={(e)=>QrCodeScan(e)} />
  </div>);
}



export default TestingPage;