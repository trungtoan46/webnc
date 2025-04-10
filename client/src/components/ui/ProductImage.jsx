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
          className="w-7/12 h-auto object-cover rounded-lg m-auto shadow-lg transition-transform duration-300"
        />
      </div>
      
      {/* Thumbnail slider */}
      <div className="grid grid-cols-4 gap-2 mt">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all
              ${selectedImage === image 
                ? 'border-gray-700 scale-95' 
                : 'border-gray-200 hover:border-gray-500'}`}
          >
            <img
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="w-3/4 h-full object-cover m-auto"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImage; 