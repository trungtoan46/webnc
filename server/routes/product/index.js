const express = require('express');
const router = express.Router();

// Import product API
const productApi = require('./api/product.api');

// Mount product API
router.use('/', productApi);

module.exports = router; 