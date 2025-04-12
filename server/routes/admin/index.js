const express = require('express');
const router = express.Router();

const productApi = require('./api/product.api');
const categoryApi = require('./api/category.api');
const usersApi = require('./api/users.api');

router.use('/products', productApi);
router.use('/categories', categoryApi);
router.use('/users', usersApi);

module.exports = router; 