import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  // Get 5 products that have sale_price
  const saleProducts = products?.filter(product => product.sale_price > 0)?.slice(0, 5) || [];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {saleProducts.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product.name_slug}`}
          className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <div className="aspect-w-1 aspect-h-1 relative overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.sale_price > 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{Math.round(((product.price - product.sale_price) / product.price) * 100)}%
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="mb-2">
              <span className="text-gray-500 text-sm uppercase">{product.category?.name || 'Uncategorized'}</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3rem] text-sm">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 justify-between">
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-red-500">
                  {product.sale_price.toLocaleString()}đ
                </span>
                <span className="text-sm text-[#155BF6] line-through">
                  {product.price.toLocaleString()}đ
                </span>
              </div>
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
  );
};

export default ProductGrid;
