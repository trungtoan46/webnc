const express = require('express');
const router = express.Router();

// Import category API
const uploadApi = require('./upload');

// Mount category API
router.use('/', uploadApi);

module.exports = router; 