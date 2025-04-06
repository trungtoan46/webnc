const express = require('express');
const router = express.Router();
const { Product } = require('../../../models/index.model.js');
const multer = require('multer');
const upload = multer();

// Get all products for admin
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    console.error('Error fetching admin products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new product
router.post('/', upload.array('images'), async (req, res) => {
  try {
    // Parse các trường text từ req.body
    const {
      name,
      description,
      price,
      category_id,
      size,
      color,
      quantity,
      is_active,
      tags
    } = req.body;

    // Parse tags nếu là JSON string
    const parsedTags = Array.isArray(tags) ? tags : tags ? [tags] : [];
       

    // Lấy danh sách tên file ảnh (nếu bạn muốn lưu tên)
    const images = req.files.map(file => file.originalname);

    // Hoặc nếu muốn lưu ảnh dạng buffer:
    // const images = req.files.map(file => file.buffer);

    // Tạo mới sản phẩm
    const product = new Product({
      name,
      description,
      price,
      category_id,
      size,
      color,
      quantity,
      is_active,  
      tags: parsedTags,
      images
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
