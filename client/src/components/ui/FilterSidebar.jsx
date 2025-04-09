import React from 'react';
import { FiFilter } from 'react-icons/fi';

const FilterSidebar = ({ filters, onFilterChange, onColorToggle, onSizeToggle }) => {
  const colorsVN = (e) => {
    if (e === 'Red') return 'Đỏ';
    if (e === 'Blue') return 'Xanh';
    if (e === 'Green') return 'Xanh lá';
    if (e === 'Black') return 'Đen';
    if (e === 'White') return 'Trắng';
    if (e === 'Yellow') return 'Vàng';
  };

  return (
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
            onChange={onFilterChange}
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
            onChange={onFilterChange}
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
                  onClick={() => onColorToggle(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    Array.isArray(filters.colors)
                      ? filters.colors.includes(color)
                        ? 'ring-2 ring-blue-500 scale-110 border-blue-500'
                        : 'border-gray-200 hover:scale-105'
                      : filters.colors === color
                        ? 'ring-2 ring-blue-500 scale-110 border-blue-500'
                        : 'border-gray-200 hover:scale-105'
                  }`}
                  style={{ 
                    backgroundColor: color.toLowerCase()
                  }}
                />
                <span 
                  className={`text-gray-700 ${
                    Array.isArray(filters.colors)
                      ? filters.colors.includes(color) ? 'font-medium' : ''
                      : filters.colors === color ? 'font-medium' : ''
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
                onClick={() => onSizeToggle(size)}
                className={`px-3 py-1 border rounded-md ${
                  Array.isArray(filters.sizes)
                    ? filters.sizes.includes(size)
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100'
                    : filters.sizes === size
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
  );
};

export default FilterSidebar; 