const express = require('express');
const router = express.Router();
const productApi = require('./api/product.api');
const searchApi = require('./api/search.api');

// Mount search routes FIRST to avoid conflicts
router.use('/search', searchApi);

// Mount other product routes
router.use('/', productApi);

module.exports = router;
