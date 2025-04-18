import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  const calculateDiscount = (price, sale_price) => {
    if (!price || !sale_price) return 0;
    // Convert string prices back to numbers for calculation
    const numPrice = Number(price.replace(/\D/g, ''));
    const numSalePrice = Number(sale_price.replace(/\D/g, ''));
    if (numPrice && numSalePrice) {
      return Math.round(((numPrice - numSalePrice) / numPrice) * 100);
    }
    return 0;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product.name_slug}`}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <div className="aspect-w-1 aspect-h-1 relative">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {calculateDiscount(product.price, product.sale_price) > 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md">
                -{calculateDiscount(product.price, product.sale_price)}%
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-medium mb-2 line-clamp-2 min-h-[3rem]">{product.name}</h3>
           
            <div className="flex items-center gap-4 mb-2">
              {product.sale_price > 0 ? (
                <div className="flex gap-2">
                  <span className="text-gray-400 text-sm">{product.sale_price}đ</span>
                  <span className="text-blue-600 font-bold line-through">{product.price}đ</span>
                </div>
              ) : (
                <span className="text-blue-600 font-bold">{product.price}đ</span>
              )}
            </div>
            
            {product.category && (
              <div className="text-sm text-gray-500">
                {product.category.name}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;