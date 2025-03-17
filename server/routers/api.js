const express = require('express');
const router = express.Router();
const { Product, Category } = require('../model');

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/products/:id', async (req, res) => {
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

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get products by category
router.get('/categories/:id/products', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.id }).populate('category');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to cart
router.post('/cart', (req, res) => {
  console.log('Before:', req.session.cart);
  try {
    const { productId, quantity } = req.body;

    if (!productId || !Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid productId or quantity' });
    }
    

    if (!req.session.cart) {
      req.session.cart = [];
    }

    const existingProductIndex = req.session.cart.findIndex(item => item.productId === productId);

    if (existingProductIndex >= 0) {
      req.session.cart[existingProductIndex].quantity += quantity;
    } else {
      req.session.cart.push({ productId, quantity });
    }

    res.status(200).json({ message: 'Product added to cart', cart: req.session.cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get cart
router.get('/cart', (req, res) => {
  try {
    const cart = req.session.cart || [];
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 