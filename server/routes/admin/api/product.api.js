const express = require('express');
const router = express.Router();
const Product = require('../../../models/Product.model');
const authenticateAdmin = require('../../../middleware/authAdmin');

router.use(authenticateAdmin);
// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category_id', 'name')
            .sort({ created_at: -1 });
        res.json(products);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ 
            success: false,
            message: 'Lỗi server', 
            error: error.message 
        });
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
        res.status(500).json({ 
            success: false,
            message: 'Lỗi server', 
            error: error.message 
        });
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
// Update product
router.put('/:id', async (req, res) => {
    try {
        const existingProduct = await Product.findById(req.params.id);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const {
            name,
            price,
            description,
            thumbnail,
            size,
            color,
            tags,
            sale_price,
            category_id,
            is_active,
            detail_images,
            product_id,
            name_slug,
            variants,
        } = req.body;

        // Gán thủ công các field
        existingProduct.name = name;
        existingProduct.price = price;
        existingProduct.description = description;
        existingProduct.thumbnail = thumbnail;
        existingProduct.size = size;
        existingProduct.color = color;
        existingProduct.tags = tags;
        existingProduct.sale_price = sale_price;
        existingProduct.category_id = category_id;
        existingProduct.is_active = is_active;
        existingProduct.detail_images = detail_images;
        existingProduct.product_id = product_id;
        existingProduct.name_slug = name_slug;

        if (Array.isArray(variants)) {
            existingProduct.variants = variants;
            // Tính lại tổng tồn kho
            existingProduct.quantity = variants.reduce((sum, v) => sum + (v.stock || 0), 0);
        }

        const updated = await existingProduct.save();

        res.json(updated);
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ 
            success: false,
            message: 'Lỗi server', 
            error: error.message 
        });
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

// Check product by name
router.get('/check-name/:name_slug', async (req, res) => {
    const { name_slug } = req.params;
    const product = await Product.findOne({ name_slug });
    res.json(product);
});

module.exports = router; 
