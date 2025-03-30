const express = require('express');
const router = express.Router();

// Import category API
const categoryApi = require('./api/category.api');

// Mount category API
router.use('/', categoryApi);

module.exports = router; 