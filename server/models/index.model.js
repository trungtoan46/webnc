const mongoose = require('mongoose');
const User = require('./User.model');
const Product = require('./Product.model');
const Category = require('./Category.model');
const Cart = require('./Cart.model');
const Voucher = require('./Voucher.model'); 
const Event = require('./Event.model');

module.exports = { User, 
    Product, Category, Cart, Voucher, Event };
