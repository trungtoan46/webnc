const express = require('express');
const app = express();
const router = express.Router();
const { Category, Product } = require('../model');

router.delete('/:id', async (req, res) => {
  try {
    // Check if category has associated products first
    const products = await Product.find({ category_id: req.params.id });
    if (products.length > 0) {
      return res.status(400).json({ 
        message: "Không thể xóa danh mục này vì có sản phẩm đang sử dụng" 
      });
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }

    res.json({ message: "Xóa danh mục thành công" });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: "Lỗi khi xóa danh mục", error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const updated_at = new Date();
    console.log(req.body)
    if (!name) {
      return res.status(400).json({ message: "Vui lòng nhập tên danh mục" });
    }

    const category = await Category.findByIdAndUpdate(req.params.id, { name, updated_at }, { new: true });

    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    res.json({ message: "Cập nhật danh mục thành công", category });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

router.post('/', async (req, res) =>{
  try{
    const name = req.body.name;
    const image = req.body.image;
    const created_at = new Date();
    const updated_at = new Date();

    if (!name){
      return res.status(400).json({message: "Vui lòng nhập tên danh mục"});
    }
    
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (!existingCategory) {
      const newCategory = new Category({ name, image, created_at, updated_at });
      await newCategory.save();
      res.status(201).json({ message: "Thêm danh mục thành công" });
    }else{
      res.status(400).json ({message: "Danh mục đã tồn tại"})
    }
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi: ", error: error.message });
  }
});


module.exports = router;
