import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';
import api from '../services/api/api';
import './Products.css'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    color: '',
    size: ''
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

  return (
    <div className="min-h-screen bg-gray-50 products-container">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Our Products</h1>
          <p className="mt-4 text-xl text-center text-gray-300">
            Discover our latest collection
          </p>
        </div>
      </div>

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
                  className="w-full border text-gray-700 rounded-md border-gray-600"
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
                  className="w-full border-black text-gray-700 rounded-md"
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
                    
                    <div className='flex items-center gap-2'>
                    <button
                      key={color}
                      onClick={() => setFilters(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 rounded-full border ${
                        filters.color === color ? 'ring-2 ring-blue-500' : ''
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}

                    >
                    </button>
                        <span className='text-gray-700'>{
                        
                          colorsVN(color)
                          
                          }</span>
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
                      onClick={() => setFilters(prev => ({ ...prev, size }))}
                      className={`px-3 py-1 border rounded-md ${
                        filters.size === size
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
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  <FiList />
                </button>
              </div>
              <select className="border-gray-300 rounded-md">
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
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div
                      className={`${
                        viewMode === 'list' ? 'w-1/3' : 'aspect-w-1 aspect-h-1'
                      }`}
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className={`p-4 ${
                        viewMode === 'list' ? 'w-2/3' : ''
                      }`}
                    >
                      <h3 className="font-medium text-lg mb-2 text-gray-700">{product.name}</h3>
                      <p className="text-gray-600 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">
                          ${product.price.toFixed(2)}
                        </span>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                          Add to Cart
                        </button>
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