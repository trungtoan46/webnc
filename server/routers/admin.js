const express = require('express');
const router = express.Router();


const { Category, Product } = require('../model');

router.get('/', async (req, res) => {
    try{
      const products = await Product.find({});
      const categories = await Category.find({});
  
      res.render('admin', { title: "Trang quản trị", message: "Chào mừng đến với trang quản trị!",
         products: products,
         categories: categories
        });
    }
    catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
    });
  
    //admin
    router.get('/category', async (req, res) => {
    try{
      const categories = await Category.find({});
  
      res.render('category', { 
        title: "Quản lý danh mục", 
        message: "Chào mừng đến với trang quản lý danh mục!",
        categories: categories,
      });
    }catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  module.exports = router;
