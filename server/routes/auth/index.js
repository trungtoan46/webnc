const express = require('express');
const router = express.Router();

// Import auth API
const authApi = require('./api/auth.api');

// Mount auth API
router.use('/', authApi);

module.exports = router; 