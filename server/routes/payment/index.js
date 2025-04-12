const express = require('express');
const router = express.Router();
const paymentRouter = require('./api/payment.api');

router.use('/', paymentRouter);

module.exports = router;
