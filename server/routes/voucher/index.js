const express = require('express');
const router = express.Router();

// Import voucher API
const voucherApi = require('./api/voucher.api');

// Mount voucher API
router.use('/', voucherApi);

module.exports = router; 