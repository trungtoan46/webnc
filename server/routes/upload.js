const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const path = require('path');

// Cấu hình multer để xử lý file upload
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Kiểm tra loại file
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Chỉ chấp nhận file ảnh!'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // Giới hạn 5MB
  }
}).array('images', 10); // Cho phép upload tối đa 10 ảnh

router.post('/', async (req, res) => {
  try {
    // Upload files lên server tạm thời
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'Vui lòng chọn ít nhất một file ảnh!' });
      }

      try {
        // Upload từng file lên Cloudinary
        const uploadPromises = req.files.map(file => {
          return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file.path, {
              folder: 'products', // Thư mục lưu trữ trên Cloudinary
              resource_type: 'auto'
            }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            });
          });
        });

        // Chờ tất cả các file được upload xong
        const results = await Promise.all(uploadPromises);

        // Trả về mảng các URL của ảnh
        const urls = results.map(result => result.secure_url);
        res.json({ urls });

      } catch (error) {
        console.error('Lỗi khi upload lên Cloudinary:', error);
        res.status(500).json({ message: 'Lỗi khi upload ảnh!' });
      }
    });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

module.exports = router; 