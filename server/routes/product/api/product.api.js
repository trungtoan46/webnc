const express = require('express');
const router = express.Router();
const { Product } = require('../../../models/index.model');
<<<<<<< HEAD
=======
const auth = require('../../../middleware/auth');

>>>>>>> 3f9f6512593005bf41314b6fe23811e2b7fe22e0

// Get all products with filters and pagination
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      priceRange, 
      colors, 
      sizes 
    } = req.query;

    // Build query
    const query = {};
    
    if (category) {
      query.category_id = category;
    }
    
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      query.price = { $gte: min, $lte: max };
    }
    
    if (colors) {
      const colorArray = colors.split(',');
      query['variants.color'] = { $in: colorArray };
    }
    
    if (sizes) {
      const sizeArray = sizes.split(',');
      query['variants.size'] = { $in: sizeArray };
    }

    // Get total count
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    // Get products with pagination
    const products = await Product.find(query)
      .populate('category_id', 'name')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ created_at: -1 });

    res.json({
      success: true,
      products,
      totalPages,
      currentPage: parseInt(page),
      totalProducts
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
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