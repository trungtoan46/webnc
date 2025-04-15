const express = require('express');
const router = express.Router();

// Import event API
const eventApi = require('./api/event.api');

// Mount event API
router.use('/', eventApi);

module.exports = router; 