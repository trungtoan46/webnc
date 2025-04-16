const cloudinary = require("../config/cloudinary");

const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Không có file nào được tải lên" 
      });
    }

    const results = await Promise.all(req.files.map(async (file) => {
      // Tạo data URI từ buffer
      const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      
      // Upload lên Cloudinary
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "products",
        resource_type: "auto",
      });
      
      return {
        url: result.secure_url,
        public_id: result.public_id
      };
    }));

    res.json({
      success: true,
      urls: results.map(result => result.url),
      public_ids: results.map(result => result.public_id),
      message: "Upload ảnh thành công"
    });
  } catch (error) {
    console.error("Lỗi upload:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi khi tải ảnh lên",
      error: error.message 
    });
  }
};

const removeImages = async (req, res) => {
  try {
    const { public_id } = req.body;
    
    if (!public_id) {
      return res.status(400).json({ 
        success: false,
        message: "Thiếu tham số bắt buộc - public_id" 
      });
    }
    
    const result = await cloudinary.uploader.destroy(public_id);
    
    if(result.result === "ok"){
      return res.status(200).json({
        success: true,
        message: "Xóa ảnh thành công",
      });
    } else {
      throw new Error("Xóa ảnh thất bại");
    }
  } catch (error) {
    console.error("Lỗi xóa ảnh:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi khi xóa ảnh",
      error: error.message 
    });
  }
};

module.exports = {
  uploadImages,
  removeImages
};
