const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadImage } = require('../../../controller/upload');
const cloudinary = require('../../../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { uploadImages, removeImages } = require('../../../controller/upload');

// Cấu hình storage
const routerImages = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: 'jpg'
  },
});

const upload = multer({storage: storage});

routerImages.post('/upload', upload.array("images",10), uploadImages)
routerImages.post('/remove', removeImages)


module.exports = routerImages;    
 