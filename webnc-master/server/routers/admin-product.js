const express = require('express');
const { Product } = require('../model');
const router = express.Router();
const app = express();



router.post("/", async (req, res)=>{
    try{
      const {name, price, description, image_url, category_id} = req.body;
      const created_at = new Date();
      const updated_at = new Date();
      if (!name || !price || !image_url) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
      }
  
      const newProduct = new Product({ name, price,description, image_url, created_at, updated_at, category_id });
      await newProduct.save(); // Lưu vào MongoDB
      res.status(201).json({ message: "Sản phẩm đã được thêm!", product: { name, price, image_url } });
      } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
      }
  
  }
  )

  router.delete('/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }
  
      res.json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const {name, category_id, price, description, image_url} = req.body
      if (!name || !category_id || !price || !description || !image_url) {
        return res.status(400).json({ message: "Thiếu dữ liệu sản phẩm" });
      }

      const product = await Product.findByIdAndUpdate(req.params.id, { name, category_id, price, description, image_url }, { new: true });
  
      res.json({ message: "Cập nhật sản phẩm thành công", product });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  });


  module.exports = router;
