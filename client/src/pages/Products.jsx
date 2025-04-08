import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFilter, FiGrid, FiList, FiShoppingCart, FiEye } from 'react-icons/fi';
import { FaCartPlus } from 'react-icons/fa';
import api from '../services/api/api';
import './Products.css'; 
import { animate } from 'animejs';

import '@fortawesome/fontawesome-free/css/all.min.css';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    colors: [], // Changed to array for multiple selection
    sizes: []   // Changed to array for multiple selection
  });
 

  useEffect(() => {
    fetchProducts();
    
  }, []);

  // animate('.animate-slide-up', {
  //   y: {
  //     to: '-120px', // From 0px to 16rem
  //     ease: 'easeInOutCubic',
  //   },
  //   duration: 500,
    
  // }); 

  const triggerAnimation = () => {
    animate('.animate-slide-up', {
      y: {
        to: '-120px', // From 0px to 16rem
        ease: 'easeInOutCubic',
      },
      duration: 100,
    });
  };

  const resetAnimation = () => {
    animate('.animate-slide-up', {
      y: {
        to: '0px', // From 0px to 16rem
        ease: 'easeInOutCubic',
      },
      duration: 0,
    });
  };


  
  
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

  const colorsVN = (e) => {
    if (e === 'Red') {
      return 'Đỏ';
    } else if (e === 'Blue') {
      return 'Xanh';
    } else if (e === 'Green') {
      return 'Xanh lá';
    } else if (e === 'Black') {
      return 'Đen';
    } else if (e === 'White') {
      return 'Trắng';
    } else if (e === 'Yellow') {
      return 'Vàng';
    }
  }

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

  return (
    <div className="min-h-screen bg-gray-50 products-container">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
                <FiFilter className="mr-2" />
                Filters
              </h2>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2 text-gray-700">Category</h3>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full border-2 border-gray-200 px-2 py-1 text-gray-700 rounded-md"
                >
                  <option value="" className='border-gray-700'>All Categories</option>
                  <option value="shirts">Shirts</option>
                  <option value="pants">Pants</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2 text-gray-700">Price Range</h3>
                <select
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="w-full border-2 border-gray-200 px-2 py-1 text-gray-700 rounded-md"
                >
                  <option value="">All Prices</option>
                  <option value="0-100">Under $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200+">Over $200</option>
                </select>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2 text-gray-700">Màu sắc</h3>
                <div className="grid grid-cols-1 gap-2 text-gray-700">
                  {['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow'].map(color => (
                    <div key={color} className='flex items-center gap-2'>
                      <button
                        type="button"
                        onClick={() => handleColorToggle(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                          filters.colors.includes(color) 
                            ? 'ring-2 ring-blue-500 scale-110 border-blue-500' 
                            : 'border-gray-200 hover:scale-105'
                        }`}
                        style={{ 
                          backgroundColor: color.toLowerCase()
                        }}
                      />
                      <span 
                        className={`text-gray-700 ${
                          filters.colors.includes(color) ? 'font-medium' : ''
                        }`}
                      >
                        {colorsVN(color)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2 text-gray-700">Size</h3>
                <div className="flex flex-wrap gap-2 text-gray-700">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`px-3 py-1 border rounded-md ${
                        filters.sizes.includes(size)
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* View Mode Toggle */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                
              
              </div>
              <select className="border-gray-300 px-2 border-2 rounded-md text-gray-700 ">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative"
                  >
                    {product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md">
                        -{product.discount}%
                      </div>
                    )}
                      <div className="aspect-w-1 aspect-h-1 bg-gray-200 relative "
                      onMouseEnter={triggerAnimation}
                      onMouseLeave={resetAnimation}
                      >
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          
                        />
                        {/* Overlay with icons */}
                        <div className="absolute -bottom-32 left-0 right-0 bg-opacity-20
                            opacity-0 group-hover:opacity-100
                            transition-all duration-300 
                            animate-slide-up
                            flex items-center justify-center mr-2"
                            >
    
                          <button className="w-10 h-10 rounded-sm bg-white text-gray-800 flex items-center 
                                  justify-center hover:bg-black hover:text-white transition-colors duration-200
                                  group/cart relative">
                              <i className="fas fa-shopping-cart"></i>
                              <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-black text-white text-[12px] font-semibold
                                            px-2 py-1 rounded-md opacity-0 group-hover/cart:opacity-100
                                            transition-all duration-200 ease-in-out whitespace-nowrap z-10">
                                Thêm vào giỏ
                              </span>
                              <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-2 h-2 
                                bg-black rotate-45 opacity-0 group-hover/cart:opacity-100 transition-opacity duration-200"></div>
                           </button>
  
                           <Link to={`/products/${product._id}`} 
                                 className="w-10 h-10 rounded-sm
                                 bg-white text-gray-800 flex items-center justify-center
                                 hover:bg-black hover:text-white transition-colors duration-200
                                 group/eye relative">
                                   
                             <i className="fas fa-eye"></i>
                             <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-black text-white text-[12px] font-semibold
                                            px-2 py-1 rounded-md opacity-0 group-hover/eye:opacity-100
                                            transition-all duration-200 ease-in-out whitespace-nowrap z-10">
                               Xem chi tiết
                             </span>
                             <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-2 h-2 
                               bg-black rotate-45 opacity-0 group-hover/eye:opacity-100 transition-opacity duration-200"></div>
                           </Link>
                         </div>

                    </div>
                    <div className="p-4"
                    onMouseEnter={triggerAnimation}
                    onMouseLeave={resetAnimation}
                    >
                      <div className="mb-2">
                        <span className="text-gray-500 text-sm uppercase">{product.category}</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1"
                      >{product.name}</h3>
                      <div className="flex gap-1 mb-3">
                        {product.colors && product.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-2 justify-between" 
                      
                      >
                        {product.discount > 0 ? (
                          <>
                            <span className="text-lg font-bold text-red-500">
                              {(product.price * (1 - product.discount / 100)).toLocaleString()}đ
                            </span>
                            <span className="text-sm text-[#155BF6] line-through">
                              {product.price.toLocaleString()}đ
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-semibold text-[#155BF6]">
                            {product.price.toLocaleString()}đ
                          </span>
                        )}
                        {product.quantity === 0 && (
                          <div className='text-sm font-semibold text-red-500'>
                            Hết hàng
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products; 