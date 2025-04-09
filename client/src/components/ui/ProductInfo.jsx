import React from 'react';

const ProductInfo = ({ product }) => {
  const formatPrice = (price) => {
    return price.toLocaleString() + 'đ';
  };
  const discount = product.discount ? product.discount : 0; 
  console.log(product);
  return (
    <div className="md:w-full ">
      <h2 className="text-xl font-bold mb-2 text-gray-700 text-left" >{product.name}</h2>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-600 text-left text-sm">Thương hiệu:</span>
        <a href="#" className="text-blue-500 hover:underlin text-sm">Khác</a>
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

      {/* Colors */}
      <div className="mb-6">
        <h3 className="text-gray-700 mb-2">Màu sắc:</h3>
        <div className="flex gap-2">
          {product.color && (
            Array.isArray(product.color)
              ? product.color.map((color, index) => (
                  <button
                    key={index}
                    className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: product.color.toLowerCase() }}
                  />
                ))
              : <button
                  className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500"
                  style={{ backgroundColor: product.color.toLowerCase() }}
                />
          )}
        </div>
      </div>

      {/* Add to cart button */}
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
        THÊM VÀO GIỎ
      </button>
    </div>
  );
};

export default ProductInfo; 