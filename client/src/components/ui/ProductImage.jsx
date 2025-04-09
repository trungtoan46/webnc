import React, { useState } from 'react';

const ProductImage = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const images = [product.thumbnail, ...(product.images || [])];

  return (
    <div className="md:w-1/2 p-4">
      <div className="mb-4">
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg m-auto shadow-lg transition-transform duration-300"
        />
      </div>
      
      {/* Thumbnail slider */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all
              ${selectedImage === image 
                ? 'border-blue-500 scale-95' 
                : 'border-gray-200 hover:border-blue-300'}`}
          >
            <img
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImage; 