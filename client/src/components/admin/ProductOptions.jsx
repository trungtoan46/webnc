import React from 'react';
import { FormControl } from '@primer/react';

const ProductOptions = ({ 
  sizes, 
  colors, 
  handleSizeClick, 
  handleColorClick,
  getColorClass 
}) => {
  return (
    <div className="space-y-4">
      <FormControl>
        <FormControl.Label sx={{ color: "#2563eb", marginBottom: "10px" }}>
          Kích Cỡ
        </FormControl.Label>
        <div className="flex flex-wrap gap-2 justify-center">
          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <button
              key={size}
              onClick={() => handleSizeClick(size)}
              className={`px-3 py-1 rounded font-medium ${
                sizes.includes(size)
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FormControl>

      <FormControl>
        <FormControl.Label sx={{ color: "#2563eb", marginBottom: "10px", marginTop: "10px" }}>
          Màu Sắc
        </FormControl.Label>
        <div className="flex pr-4 flex-wrap gap-2 justify-start">
          {['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black', 'White'].map(color => (
            <button 
              key={color}
              onClick={() => handleColorClick(color)}   
              className={`px-3 py-1 rounded font-medium ${
                colors.includes(color)  
                  ? getColorClass(color)  
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {color}
            </button>   
          ))}
        </div>
      </FormControl>
    </div>
  );
};

export default ProductOptions; 