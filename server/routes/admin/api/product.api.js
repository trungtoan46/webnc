const express = require('express');
const router = express.Router();
const Product = require('../../../models/Product.model');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category_id', 'name')
            .sort({ created_at: -1 });
        res.json(products);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create new product
router.post('/', async (req, res) => {
    try {
        const productData = req.body;
        const product = new Product(productData);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category_id', 'name');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error getting product:', error);
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
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        console.log('Deleting product with ID:', req.params.id);
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ 
            success: true,
            message: 'Product deleted successfully',
            deletedProduct: product 
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to delete product', 
            error: error.message 
        });
    }
});

module.exports = router; 
