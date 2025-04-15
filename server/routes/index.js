const express = require('express');
const router = express.Router();

// Import routes
const adminRoutes = require('./admin');
const authRoutes = require('./auth');
const cartRoutes = require('./cart');
const categoryRoutes = require('./category');
const productRoutes = require('./product');
const voucherRoutes = require('./voucher');
const uploadRoutes = require('./images/api/upload');
const paymentRoutes = require('./payment');
const eventRoutes = require('./event');

// Mount routes
router.use('/admin', adminRoutes);
router.use('/auth', authRoutes); 
router.use('/cart', cartRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/vouchers', voucherRoutes);
router.use('/images', uploadRoutes);
router.use('/payment', paymentRoutes);
router.use('/events', eventRoutes);

module.exports = router; 