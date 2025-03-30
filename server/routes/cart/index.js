const express = require('express');
const router = express.Router();

// Import cart API
const cartApi = require('./api/cart.api');

// Mount cart API
router.use('/', cartApi);

module.exports = router; 