const express = require('express');
const router = express.Router();

// Import admin APIs
const productApi = require('./api/product.api');
const categoryApi = require('./api/category.api');

// Mount admin APIs
router.use('/products', productApi);
router.use('/categories', categoryApi);

module.exports = router; 