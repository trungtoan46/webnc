const cloudinary = require("../config/cloudinary");

const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Không có file nào được tải lên" } );
    }

    const results = await Promise.all(req.files.map(async (file) => {
      return await cloudinary.uploader.upload(file.path, {
        folder: "products",
        resource_type: "auto",
      });
    }));

    res.json({
      success: true,
      urls: results.map(result => result.secure_url),
      message: "Upload ảnh thành công"
    });
  } catch (error) {
    console.error("Lỗi upload:", error);
    res.status(500).json({ message: "Lỗi khi tải ảnh lên" });
  }
};

const removeImages = async (req, res) => {
  try{
    const publicId=req.params.publicId;
    const result = await cloudinary.uploader.destroy(publicId);
    if(result.result === "ok"){
      return res.status(200).json({
        success: true,
        message: "Xóa ảnh thành công",
      });
    }
    else{
      throw new Error("Xóa ảnh thất bại");
    }
  }catch(error){
    console.error("Lỗi xóa ảnh:", error);
    res.status(500).json({ message: "Lỗi khi xóa ảnh" });
  }
}

module.exports = {
  uploadImages,
  removeImages,
};
