import React from 'react';
import { FiFilter } from 'react-icons/fi';
import Select from 'react-select';

const FilterSidebar = ({ filters, categories, onFilterChange, onColorToggle, onSizeToggle, products, setFilteredProducts }) => {
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black', 'White'];
  const sizes = ['S', 'M', 'L', 'XL'];
  const priceRanges = [
    { value: '', label: 'Tất cả giá' },
    { value: '0-100000', label: 'Dưới 100,000đ' },
    { value: '100000-500000', label: '100,000đ - 500,000đ' },
    { value: '500000-1000000', label: '500,000đ - 1,000,000đ' },
    { value: '1000000+', label: 'Trên 1,000,000đ' }
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? '#3b82f6' : 'white',
      padding: '8px 12px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#e5e7eb',
      },
    }),
    control: (provided) => ({
      ...provided,
      borderColor: '#d1d5db',
      '&:hover': {
        borderColor: '#3b82f6',
      },  
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '6px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    }),
  };

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map(category => ({
      value: category._id,
      label: category.name
    }))
  ];

  

  return (
    <div className="w-1/3 bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
        <FiFilter className="mr-2" />
        Filters
      </h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
        <Select
          options={categoryOptions}
          value={categoryOptions.find(option => option.value === filters.category)}
          onChange={(selectedOption) => onFilterChange({ target: { name: 'category', value: selectedOption.value } })}
          styles={customStyles}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
        <Select
          options={priceRanges}
          value={priceRanges.find(range => range.value === filters.priceRange)}
          onChange={(selectedOption) => onFilterChange({ target: { name: 'priceRange', value: selectedOption.value } })}
          styles={customStyles}
          className="react-select-container"
          classNamePrefix="react-select"
        />
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