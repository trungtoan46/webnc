import React from 'react';
import { animate } from 'animejs';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product, onOpenPopup, onAddToCart }) => {
  const navigate = useNavigate();
  const triggerAnimation = () => {
    animate('.animate-slide-up', {
      y: {
        to: '-120px',
        ease: 'easeInOutCubic',
      },
      duration: 100,
    });
  };

  const resetAnimation = () => {
    animate('.animate-slide-up', {
      y: {
        to: '0px',
        ease: 'easeInOutCubic',
      },
      duration: 0,
    });
  };

  return (
    <div
      className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative"
    >
      {product.discount > 0 && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md">
          -{product.discount}%
        </div>
      )}
      <div 
        className="aspect-w-1 aspect-h-1 bg-gray-200 relative"
        onMouseEnter={triggerAnimation}
        onMouseLeave={resetAnimation}
      >
        <img
          onClick={() => navigate(`/product/${product.name_slug}`, { state: { productId: product._id } })}
          src={product.thumbnail}
          alt={product.name}
          className="w-full cursor-pointer
           h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Overlay with icons */}
        <div className="absolute -bottom-32 left-0 right-0 bg-opacity-20
          opacity-0 group-hover:opacity-100
          transition-all duration-300 
          animate-slide-up
          flex items-center justify-center mr-2"
        >
          <button 
            className="w-10 h-10 rounded-sm bg-white text-gray-800 flex items-center 
              justify-center hover:bg-black hover:text-white transition-colors duration-200
              group/cart relative"
            onClick={() => onAddToCart(product, 1)}
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-black text-white text-[12px] font-semibold
              px-2 py-1 rounded-md opacity-0 group-hover/cart:opacity-100
              transition-all duration-200 ease-in-out whitespace-nowrap z-10">
              Thêm vào giỏ
            </span>
            <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-2 h-2 
              bg-black rotate-45 opacity-0 group-hover/cart:opacity-100 transition-opacity duration-200"></div>
          </button>

          <button
            onClick={() => onOpenPopup(product)}
            className="w-10 h-10 rounded-sm bg-white text-gray-800 flex items-center 
              justify-center hover:bg-black hover:text-white transition-colors duration-200
              group/eye relative"
          >
            <i className="fas fa-eye"></i>
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-black text-white text-[12px] font-semibold
              px-2 py-1 rounded-md opacity-0 group-hover/eye:opacity-100
              transition-all duration-200 ease-in-out whitespace-nowrap z-10">
              Xem chi tiết
            </span>
            <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-2 h-2 
              bg-black rotate-45 opacity-0 group-hover/eye:opacity-100 transition-opacity duration-200"></div>
          </button>
        </div>
      </div>
      <div 
        className="p-4"
        onMouseEnter={triggerAnimation}
        onMouseLeave={resetAnimation}
      >
        <div className="mb-2">
          <span className="text-gray-500 text-sm uppercase">{product.category}</span>
        </div>
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex gap-1 mb-3">
          {product.colors && (
            Array.isArray(product.colors) 
              ? product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))
              : <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: product.colors.toLowerCase() }}
                />
          )}
        </div>
        <div className="flex items-center gap-2 justify-between">
          {product.discount > 0 ? (
            <>
              <span className="text-lg font-bold text-red-500">
                {(product.price * (1 - product.discount / 100)).toLocaleString()}đ
              </span>
              <span className="text-sm text-[#155BF6] line-through">
                {product.price.toLocaleString()}đ
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold text-[#155BF6]">
              {product.price.toLocaleString()}đ
            </span>
          )}
          {product.quantity === 0 && (
            <div className='text-sm font-semibold text-red-500'>
              Hết hàng
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 