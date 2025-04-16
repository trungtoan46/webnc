import React, { useState } from 'react';

const ProductImage = ({ product, event }) => {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const images = [product.thumbnail, ...(product.detail_images || [])];
  console.log("event:", event);
  return (
    <div className="md:w-1/2 p-4">
      <div className="mb-4 relative">
        <img
          src={selectedImage}
          alt={product.name}
          className="w-10/12 h-auto object-cover rounded-lg m-auto shadow-lg transition-transform duration-300"
        />
        {product.event && (
          <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
            <img 
              src={product.event.image} 
              alt={product.event.name}
              className="w-3/4 h-3/4 object-cover rounded-full border-2 border-white"
            />
          </div>
        )}
      </div>
      
      {/* Thumbnail slider */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all relative
              ${selectedImage === image 
                ? 'border-gray-700 scale-95' 
                : 'border-gray-200 hover:border-gray-500'}`}
          >
            <img
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="w-3/4 h-full object-cover m-auto"
            />
            {product.event && index === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <img 
                  src={product.event.image} 
                  alt={product.event.name}
                  className="w-1/2 h-1/2 object-cover rounded-full border border-white"
                />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImage; 