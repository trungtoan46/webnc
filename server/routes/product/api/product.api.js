const express = require('express');
const router = express.Router();
const { Product } = require('../../../models/index.model');
const auth = require('../../../middleware/auth');


// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// routes/products.js
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('event').exec();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});


// Get product by slug name - ĐẶT TRƯỚC các route có pattern tương tự
router.get('/name/:name_slug', async (req, res) => {
  try {
    const product = await Product.findOne({ name_slug: req.params.name_slug }).exec();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by name:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get products by category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId }).populate('category');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get products with pagination - ĐẶT SAU các route cụ thể
router.get('/:page/:limit', async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.params;
    // Chuyển đổi page và limit thành số
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    
    // Kiểm tra nếu không phải số hợp lệ
    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      return res.status(400).json({ message: 'Invalid page or limit value' });
    }

    const products = await Product.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limitNumber);
    res.json({ products, totalPages });
  } catch (error) {
    console.error('Error fetching products with pagination:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;