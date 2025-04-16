const express = require('express');
const router = express.Router();
const orderRoutes = require('./api/order');

// Mount order routes
router.use('/api', orderRoutes);

module.exports = router;
