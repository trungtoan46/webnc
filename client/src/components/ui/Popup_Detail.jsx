import React from 'react';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import PromotionBox from './PromotionBox';

const PopupDetail = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl relative max-h-[570px] overflow-y-auto mb-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row">
          <ProductImage product={product} />
          <div className="md:w-1/2 p-4">
            <ProductInfo product={product} />
            <PromotionBox />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDetail;


