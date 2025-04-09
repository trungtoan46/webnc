import React, { useState, useEffect } from 'react';
import api from '../services/api/api';
import './Products.css';
import PopupDetail from '../components/ui/Popup_Detail';
import FilterSidebar from '../components/ui/FilterSidebar';
import ProductGrid from '../components/ui/ProductGrid';
import { addToCart } from '../services/api/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    colors: [],
    sizes: []
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColorToggle = (color) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleSizeToggle = (size) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleOpenPopup = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = async (product, quantity) => {
    if (!product) {
      alert('Product information is not available.');
      return;
    }
  
    if (quantity < 1) {
      alert('Quantity must be at least 1.');
      return;
    }
  
    try {
      console.log(`Adding product ${product._id} to cart with quantity:`, quantity);
      
      await addToCart({ productId: product._id, quantity });
  
      alert('Product added to cart successfully!');
    } catch (err) {
      console.error('Error adding to cart:', err.response?.data || err.message);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 products-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onColorToggle={handleColorToggle}
            onSizeToggle={handleSizeToggle}
          />
          <ProductGrid
            products={products}
            loading={loading}
            onOpenPopup={handleOpenPopup}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
      {showPopup && (
        <PopupDetail 
          product={selectedProduct} 
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Products; 