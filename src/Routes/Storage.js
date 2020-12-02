
const express = require('express');
const cloudinary  = require('cloudinary');
const { uuid} = require('uuidv4');
const router = express.Router()
const {format} = require('util');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
const filekey = require('/Users/apple/Desktop/Projects/E-App Backend/e-app-b5e7f-firebase-adminsdk-zaa7c-255543bc59.json');
var uuidpublic


const storage = new Storage({
  projectId: "e-app-b5e7f",
  //keyFilename:apifile
   keyFilename:'/Users/apple/Desktop/Projects/E-App Backend/e-app-b5e7f-firebase-adminsdk-zaa7c-255543bc59.json'
});

const bucket = storage.bucket("gs://e-app-b5e7f.appspot.com");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});


////////////////////////////////////////////////


cloudinary.config({ 
  cloud_name: 'dx8xcafmu', 
  api_key: '754631223834792', 
  api_secret: 'txryzLg-q8AE9c5nr7_1D9h1140' 
});





/**
 * Adding new file to the storage
 */
router.post('/', multer.single('file'), (req, res,next) => {
  console.log('Upload Image');
  console.log(req.file)
uuidpublic = uuid()
  let file = req.file.originalname;
  filepubic = file
console.log(file)
  if(!req.file){
   return res.status(422).json({
      message:"no file found for uploading",
      status:res.statusCode
    })
  }else{
    const blob = bucket.file(req.file.originalname)
    const blobStream = blob.createWriteStream();
    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

 
  blobStream.on('error', (err) => {
   
      console.log(err);
     return  res.status(422).json({
         message:""+err,
         status:res.statusCode,
         success:false
          });
  
  });

  blobStream.on('finish', (data) => {
    console.log('finishing')
    // The public URL can be used to directly access the file via HTTP.
  const publicUrl = format("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file) + "?alt=media&token=" + uuidpublic);
    //const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}?access_token=${token}"`);
    return res.status(200).json({
      message:"image Uploaded Successfully",
      status:res.statusCode,
      data:publicUrl,
      success:true
    })

  });

  blobStream.end(req.file.buffer);
  
}

});



router.post('/postImage',multer.single('file'), (req, res,next) => {
  let file = req.file.originalname;
  filepubic = file
console.log(file)
  if(!req.file){
   return res.status(422).json({
      message:"no file found for uploading",
      status:res.statusCode
    })
  }else{
    cloudinary.uploader.upload(file)
    .then((result) => {
      response.status(200).send({
        message: "success",
        result,
      });
    }).catch((error) => {
      response.status(500).send({
        message: "failure",
        error,
      });
    });
   
  }

})


module.exports = router