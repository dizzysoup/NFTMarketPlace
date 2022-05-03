import jsQR from "jsqr";

//QrCode 解碼
async function QrCodeScan(e, context_val ){    
    
    const file = e.target.files.item(0);
    let code = "";
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
      if(imageData.data.length !== 360000 && imageData.data.length !== 160000) {
        alert("此圖不屬於會員通行證");
        return ;
      }      
      code = jsQR(imageData.data, image.width , image.height);
      context_val.SetData(code.data)      
    }    

}




export default QrCodeScan ; 