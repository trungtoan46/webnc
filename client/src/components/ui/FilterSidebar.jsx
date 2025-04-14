import React from 'react';
import { FiFilter } from 'react-icons/fi';

const FilterSidebar = ({ filters, categories, onFilterChange, onColorToggle, onSizeToggle }) => {
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black', 'White'];
  const sizes = ['S', 'M', 'L', 'XL'];
  const priceRanges = [
    { value: '', label: 'All Prices' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: 'Over $200' }
  ];

  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
        <FiFilter className="mr-2" />
        Filters
      </h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
        <select
          name="category"
          value={filters.category}
          onChange={onFilterChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
        <select
          name="priceRange"
          value={filters.priceRange}
          onChange={onFilterChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          {priceRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Colors</h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorToggle(color)}
              className={`w-full p-2 text-xs rounded ${
                filters.colors.includes(color)
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              } hover:bg-blue-50`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Sizes</h3>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeToggle(size)}
              className={`w-full p-2 text-xs rounded ${
                filters.sizes.includes(size)
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              } hover:bg-blue-50`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar; 