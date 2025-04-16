const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadImages, removeImages } = require('../../../controller/upload');
const cloudinary = require('../../../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cấu hình storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    format: 'jpg, png, jpeg, webp',
    resource_type: 'auto'
  }
});

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Loại file không được hỗ trợ'), false);
    }
  }
});

// Route upload ảnh
router.post('/upload', upload.array('images', 10), uploadImages);


const detailStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products/detail',
    format: 'jpg, png, jpeg, webp',
    resource_type: 'auto'
  }
});

const detailUpload = multer({ storage: detailStorage });

router.post('/upload-detail', detailUpload.array('images', 10), uploadImages);

// Route xóa ảnh
router.post('/remove', removeImages);

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
router.post('/upload-event', uploadEvent.single("image"), async (req, res) => {
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

module.exports = router;    
 