const express = require('express');
const router = express.Router();

// Add to cart
router.post('/', (req, res) => {
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
router.get('/', (req, res) => {
  try {
    const cart = req.session.cart || [];
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 