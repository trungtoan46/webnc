import React, { useEffect } from 'react';

const ProductInfo = ({ product, selectedColor, selectedSize, onSizeChange, onColorChange, quantity }) => {
  
  const formatPrice = (price) => {
    if (!price || isNaN(price)) return '0đ';
    return price.toLocaleString() + 'đ';
  };

  // Ensure all price calculations use valid numbers
  const calculatePrices = () => {
    const basePrice = Number(product.price) || 0;
    const salePrice = Number(product.sale_price) || 0;
    const saleDiscount = basePrice > 0 ? ((basePrice - salePrice) / basePrice) * 100 : 0;
    const qty = Number(quantity) || 1;

    const discountedPrice = basePrice * (1 - saleDiscount / 100);
    const total = discountedPrice * qty;

    return {
      basePrice,
      discountedPrice,
      total
    };
  };

  const calculateDiscount = (price, sale_price) => {
    if (price && sale_price) {
        const discountPercentage = ((price - sale_price) / price) * 100;
        return discountPercentage.toFixed(0); 
    }
    return 0;
}

  const { basePrice, discountedPrice, total } = calculatePrices();

  // Log values for debugging
  useEffect(() => {
    console.log('Price calculations:', {
      price: product.price,
      sale_price: product.sale_price,
      quantity,
      discountedPrice,
      total
    });
  }, [product.price, product.sale_price, quantity, discountedPrice, total]);

  const ColorVN ={
    'White': 'Trắng',
    'Black': 'Đen',
    'Blue': 'Xanh',
    'Red': 'Đỏ',
    'Yellow': 'Vàng',
    'Green': 'Xanh lá',
    'Brown': 'Nâu',
    'Pink': 'Hồng',
    'Purple': 'Tím',
    'Orange': 'Cam',
    'Gray': 'Xám',
    'Gold': 'Vàng',
    'Silver': 'Bạc',
  }

  const handleSizeChange = (size) => {
    onSizeChange(size);
  };

  const handleColorChange = (color) => {
    onColorChange(color);
  };  

  // Đảm bảo luôn có một mảng để map
  const colors = Array.isArray(product.variants)
    ? [...new Set(product.variants.map(variant => variant.color))]
    : typeof product.variants === 'string'
    ? [product.variants]
    : [];

  const sizes = Array.isArray(product.variants)
    ? [...new Set(product.variants.map(variant => variant.size))]
    : typeof product.variants === 'string'
    ? [product.variants]
    : [];

  // Tính số lượng hàng còn lại cho variant được chọn
  const getSelectedVariantStock = () => {
    if (!selectedColor || !selectedSize || !Array.isArray(product.variants)) return 0;
    
    const selectedVariant = product.variants.find(
      variant => variant.color === selectedColor && variant.size === selectedSize
    );
    
    return selectedVariant ? selectedVariant.stock : 0;
  };

  // Tính tổng số lượng hàng còn lại
  const getTotalStock = () => {
    if (!Array.isArray(product.variants)) return 0;
    return product.variants.reduce((total, variant) => total + variant.stock, 0);
  };

  const currentStock = getSelectedVariantStock();
  const totalStock = getTotalStock();
  
 

  return (
    <div className="md:w-full">
      <h2 className="text-xl font-bold  text-gray-700 text-left">{product.name}</h2>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-600 text-left text-sm">Thương hiệu:</span>
        <a href="#" className="text-blue-500 hover:underline text-sm">Khác</a>
        <span className="text-gray-400 text-left text-sm">|</span>
        <span className="text-gray-600 text-left text-sm">Mã sản phẩm:</span>
        <span className="text-blue-500 text-left text-sm">Đang cập nhật</span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span className="text-2xl font-bold text-blue-600">
          {formatPrice(discountedPrice)}
        </span>
        {product.sale_price > 0 && (
          <>
            <span className="text-gray-500 line-through">
              {formatPrice(basePrice)}
            </span>
            <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm">
              -{calculateDiscount(product.price, product.sale_price)}%
            </span>
          </>
        )}
      </div>

      {/* Stock Information */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Tổng kho:</span>
          <span className="font-medium">{totalStock} sản phẩm</span>
        </div>
        {selectedSize && selectedColor && (
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className="text-gray-600">Còn lại:</span>
            <span className={`font-medium ${currentStock < 10 ? 'text-red-500' : 'text-green-500'}`}>
              {currentStock} sản phẩm
            </span>
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="mb-2">
        <h3 className="text-gray-700 mb-2 text-sm text-left">Kích thước:</h3>
        <div className="flex gap-2 relative">
          {sizes.map((size, index) => (
            <div key={index} className='relative overflow-hidden'>
              <button
                type="button"
                value={size}
                onClick={() => handleSizeChange(size)}
                className={`appearance-none outline-none ring-0 focus:outline-none w-8 h-8
                  border-2 p-1 rounded-md text-gray-700 text-center text-sm
                  ${selectedSize === size ? 'border-black' : 'border-gray-500 cursor-pointer'}`}
              >
                {size}
              </button>
              <div className={`absolute -top-6 -right-[22px] bg-black rounded-full
                w-10 h-10 flex items-center justify-center transition-opacity
                rotate-[90deg] ${selectedSize === size ? 'opacity-100' : 'opacity-0'}`}>
                <img 
                  src="/src/assets/done.png" 
                  alt="Done" 
                  className='w-2 h-2 bg-black rounded -rotate-90 absolute left-[26px] bottom-[9px]' 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      {colors.length > 0 && (
        <div className="mb-6">
          <h3 className="text-gray-700 mb-2 text-sm text-left">Màu sắc:</h3>
          <div className="flex gap-2">
            {colors.map((color, index) => (
              <div key={index} className="relative group">
                <button
                  type="button"
                  value={color}
                  onClick={() => handleColorChange(color)} 
                  className={`w-8 h-8 rounded-full transition-all border-2 duration-200
                    border-gray-700
                    ${selectedColor === color ? 'border-[3px] border-blue-500 scale-110' : ''}
                  `}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
                <span className="absolute -top-8 -left-3 bg-black text-white text-[12px] font-semibold
                  px-2 py-1 rounded-md opacity-0 group-hover:opacity-100
                  whitespace-nowrap z-10">
                  {ColorVN[color]}
                </span>
                <div className="absolute -top-3 left-3 w-2 h-2 
                  bg-black rotate-45 opacity-0 group-hover:opacity-100">
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total Price */}
      {selectedSize && selectedColor && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Tổng tiền:</span>
            <span className="text-xl font-bold text-blue-600">{formatPrice(total)}</span>
          </div>
          {currentStock < 10 && currentStock > 0 && (
            <div className="mt-2 text-red-500 text-sm">
              Chỉ còn {currentStock} sản phẩm - Mua ngay!
            </div>
          )}
          {currentStock === 0 && (
            <div className="mt-2 text-red-500 text-sm font-medium">
              Hết hàng
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
