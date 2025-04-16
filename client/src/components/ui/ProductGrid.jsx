import React from 'react';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ products, loading, onOpenPopup, onAddToCart }) => {
  const navigate = useNavigate();
  return (
    <div className="lg:w-full min-h-[800px]">
      {/* View Mode Toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
        </div>
        <select className="border-gray-300 px-2 border-2 rounded-md text-gray-700">
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
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onOpenPopup={onOpenPopup}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid; 