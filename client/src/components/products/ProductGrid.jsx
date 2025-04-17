import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaFire } from 'react-icons/fa';

const ProductGrid = ({ products }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex gap-4 mb-6 border-b pb-4">
        <button className="font-semibold text-blue-600 border-b-2 border-blue-600">
          Hùng hiệu -50%
        </button>
        <button className="text-gray-500 hover:text-blue-600">
          Năng động ngày hè
        </button>
        <button className="text-gray-500 hover:text-blue-600">
          Chào biển nắng mới
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-[300px] object-cover"
              />
              <button className="absolute top-0 right-0 p-2">
                <FaHeart className={`text-xl ${product.isLiked ? 'text-red-500' : 'text-gray-400'}`} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-center py-2 font-medium">
                MUA LÀ CÓ QUÀ
              </div>
            </div>

            <div className="p-4">
              <div className="text-gray-500 text-sm mb-1">{product.brand}</div>
              <h3 className="font-medium mb-2">{product.name}</h3>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600 font-bold">{product.salePrice.toLocaleString()}đ</span>
                <span className="text-gray-400 line-through text-sm">{product.originalPrice.toLocaleString()}đ</span>
                <span className="text-red-500 text-sm">-{product.discount}%</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {product.colors.map((color, i) => (
                    <div 
                      key={i}
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">+{product.colorCount}</span>
              </div>

              {product.isTrending && (
                <div className="flex items-center gap-1 text-orange-500 mt-2">
                  <FaFire />
                  <span className="text-sm font-medium">TRENDING</span>
                </div>
              )}

              <div className="mt-2 text-sm text-gray-500">
                Đã bán {product.soldCount} sản phẩm
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid; 