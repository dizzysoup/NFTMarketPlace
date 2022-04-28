import React from "react";
// Qrcode  相關的function 


// 下載Qrcode 
export const downloadQRCode = (qrcode) => {
    const canvas = document.getElementById("qrcode");
    const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png","image/octet-stream")
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl
    downloadLink.download = `${qrcode}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
