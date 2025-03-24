import React from 'react';

const FeaturedProducts = ({ products }) => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Sản phẩm nổi bật</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-blue-600 font-bold">
                {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;