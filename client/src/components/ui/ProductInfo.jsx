import React, { useState } from 'react';

const ProductInfo = ({ product, selectedColor, selectedSize, onSizeChange, onColorChange }) => {
  
  const formatPrice = (price) => {
    return price.toLocaleString() + 'đ';
  };

  const discount = product.discount ? product.discount : 0;

  const ColorVN ={
    'White': 'Trắng',
    'Black': 'Đen',
    'Blue': 'Xanh',
    'Red': 'Đỏ',
    'Yellow': 'Vàng',
  }

  const handleSizeChange = (size) => {
    onSizeChange(size);
  };

  const handleColorChange = (color) => {
    onColorChange(color);
  };  

 

  // Đảm bảo luôn có một mảng để map
  const colors = Array.isArray(product.color)
    ? product.color
    : typeof product.color === 'string'
    ? [product.color]
    : [];

  const sizes = Array.isArray(product.size)
    ? product.size
    : typeof product.size === 'string'
    ? [product.size]
    : [];

  return (
    <div className="md:w-full">
      <h2 className="text-xl font-bold  text-gray-700 text-left">{product.name}</h2>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-600 text-left text-sm">Thương hiệu:</span>
        <a href="#" className="text-blue-500 hover:underline text-sm">Khác</a>
        <span className="text-gray-400 text-left text-sm">|</span>
        <span className="text-gray-600 text-left text-sm">Mã sản phẩm:</span>
        <span className="text-blue-500 text-left text-sm">Đang cập nhật</span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span className="text-2xl font-bold text-blue-600">
          {formatPrice(product.price * (1 - discount / 100))}
        </span>
        {product.discount > 0 && (
          <>
            <span className="text-gray-500 line-through">
              {formatPrice(product.price)}
            </span>
            <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm">
              -{product.discount}%
            </span>
          </>
        )}
      </div>

      {/* Sizes */}
      <div className="mb-2 ">
          <h3 className="text-gray-700 mb-2 text-sm text-left">Kích thước:</h3>
          <div className="flex gap-2 relative  ">
            {sizes.map((size, index) => (
              <div className='relative overflow-hidden'>
                  <button
                key={index}
                type="button"
                value={size}
                onClick={() => handleSizeChange(size)}
                className={`appearance-none outline-none ring-0 focus:outline-none w-8 h-8
                  border-2 p-1 rounded-md text-gray-700 text-center text-sm
                  ${selectedSize === size ? 'border-black' : 'border-gray-500 cursor-pointer'}`}
              >
                {size}
              </button>
                  <div className={`absolute -top-6 -right-[22px] bg-black rounded-full
                  w-10 h-10 flex items-center justify-center transition-opacity
                  rotate-[90deg]
                   
                  ${selectedSize === size ? 'opacity-100' : 'opacity-0'}`}>
                  <img src="/src/assets/done.png" alt="Done" 
                  className='w-2 h-2 bg-black rounded -rotate-90 absolute
                  left-[26px] bottom-[9px]' />
                
                  
                  </div>
              </div>
              
              
            ))}
          </div>
        </div>



      {/* Colors */}
      {colors.length > 0 && (
        <div className="mb-6">
          <h3 className="text-gray-700 mb-2 text-sm text-left">Màu sắc:</h3>
          <div className="flex gap-2">
            {colors.map((color, index) => (
              <div key={index} className="relative group">
                <button
                  type="button"
                  value={color}
                  onClick={() => handleColorChange(color)} 
                  className={`w-8 h-8 rounded-full transition-all border-2 duration-200
                    border-gray-700
                    ${selectedColor === color ? 'border-[3px] border-blue-500 scale-110' : ''}
                  `}
                  style={{ backgroundColor: color.toLowerCase() }}
                />

                {/* Tooltip */}
                <span className="absolute -top-8 -left-3 bg-black text-white text-[12px] font-semibold
                  px-2 py-1 rounded-md opacity-0 group-hover:opacity-100
                  whitespace-nowrap z-10">
                  {ColorVN[color]}
                </span>

                {/* Arrow below tooltip */}
                <div className="absolute -top-3 left-3 w-2 h-2 
                  bg-black rotate-45 opacity-0 group-hover:opacity-100">
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      
  
    </div>
  );
};

export default ProductInfo;
