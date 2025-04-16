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
    format: 'jpg, png, jpeg, webp',
    resource_type: 'auto'
  },
});

const upload = multer({storage: storage});

routerImages.post('/upload', upload.array("images",10), uploadImages, async (req, res) => {
  try {
    const uploadedImages = req.files.map(file => file.path);
    res.json({
      success: true,
      images: uploadedImages
    });
  } catch (error) {
    console.error("Lỗi upload:", error);
    res.status(500).json({ message: "Lỗi khi tải ảnh lên" });
  }
});
routerImages.post('/remove', removeImages)

// Cấu hình storage riêng cho event
const eventStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'event',              // 👈 lưu ảnh vào folder 'event'
    resource_type: 'auto'
  },
});

const uploadEvent = multer({ storage: eventStorage });

// Route upload ảnh event (chỉ 1 ảnh)
routerImages.post('/upload-event', uploadEvent.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Không có ảnh nào được tải lên" });
    }

    return res.json({
        imageUrl: req.file.path
    });
  } catch (error) {
    console.error("Lỗi upload event:", error);
    res.status(500).json({ message: "Lỗi khi tải ảnh lên sự kiện" });
  }
});




module.exports = routerImages;    
 