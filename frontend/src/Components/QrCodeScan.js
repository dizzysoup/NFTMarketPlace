import jsQR from "jsqr";


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

export default QrCodeScan ; 