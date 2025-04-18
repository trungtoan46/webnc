const express = require('express');
const router = express.Router();
const { Product } = require('../../../models/index.model');

router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    console.log('Raw search query:', q);

    if (!q || !q.trim()) {
      console.log('No query provided');
      return res.json([]);
    }

    // Decode and clean the search query
    const decodedQuery = decodeURIComponent(q).trim();
    console.log('Decoded search query:', decodedQuery);

    // Create a case-insensitive search regex
    const searchRegex = new RegExp(decodedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    console.log('Search regex:', searchRegex);

    // Search in name and description with proper population
    const products = await Product.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex }
      ],
      is_active: true
    })
    .populate({
      path: 'category_id',
      select: 'name'
    })
    .select('name name_slug thumbnail price sale_price discount description')
    .sort({ created_at: -1 })
    .lean();

    console.log(`Found ${products.length} products`);
    
    // Format the response
    const formattedProducts = products.map(product => ({
      ...product,
      price: product.price?.toString() || '0',
      sale_price: product.sale_price?.toString() || product.price?.toString() || '0'
      
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
