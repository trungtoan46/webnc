import React from 'react';

const ProductVariants = ({
  sizes = ['S', 'M', 'L', 'XL', 'XXL'],
  colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black', 'White'],
  selectedSizes = [],
  selectedColors = [],
  variants = [],
  onSizeSelect,
  onColorSelect,
  onQuantityChange
}) => {
  const getColorStyle = (color) => {
    const baseStyle = "w-4 h-4 rounded-full inline-block mr-2 ";
    const colorMap = {
      Red: "bg-red-500",
      Blue: "bg-blue-500",
      Green: "bg-green-500",
      Yellow: "bg-yellow-400",
      Purple: "bg-purple-500",
      Black: "bg-black",
      White: "bg-white border border-gray-300"
    };
    return baseStyle + (colorMap[color] || "bg-gray-500");
  };

  const getVariantQuantity = (size, color) => {
    const variant = variants.find(v => v.size === size && v.color === color);
    return variant ? variant.quantity : 0;
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Kích Cỡ */}
      <div>
        <h3 className="text-gray-800 font-semibold mb-3">Kích Cỡ</h3>
        <div className="flex gap-2">
          {sizes.map(size => (
            <button
              key={size}
              type="button"
              onClick={() => onSizeSelect(size)}
              className={`w-12 h-12 flex items-center justify-center rounded-md border ${
                selectedSizes.includes(size)
                  ? 'bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-blue-500'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Màu Sắc */}
      <div>
        <h3 className="text-gray-800 font-semibold mb-3">Màu Sắc</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button
              key={color}
              type="button"
              onClick={() => onColorSelect(color)}
              className={`px-4 py-2 rounded-md border ${
                selectedColors.includes(color)
                  ? 'bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-blue-500'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Quản Lý Số Lượng */}
      {selectedSizes.length > 0 && selectedColors.length > 0 && (
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">Quản Lý Số Lượng Theo Kích Cỡ & Màu Sắc</h3>
          <div className="space-y-4">
            {selectedSizes.map(size => (
              <div key={size} className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="text-gray-700 font-medium mb-3">Kích cỡ: {size}</h4>
                <div className="grid gap-4">
                  {selectedColors.map(color => (
                    <div key={`${size}-${color}`} className="flex items-center">
                      <div className="flex items-center min-w-[120px]">
                        <span className={getColorStyle(color)} />
                        <span className="text-gray-700">{color}</span>
                      </div>
                      <div className="flex items-center border rounded-md">
                        <button
                          type="button"
                          onClick={() => {
                            const currentQty = getVariantQuantity(size, color);
                            onQuantityChange(size, color, Math.max(0, currentQty - 1));
                          }}
                          className="px-3 py-1 border-r text-gray-700 hover:bg-gray-50"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={getVariantQuantity(size, color)}
                          onChange={(e) => onQuantityChange(size, color, parseInt(e.target.value) || 0)}
                          className="w-16 text-center py-1 text-gray-700 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const currentQty = getVariantQuantity(size, color);
                            onQuantityChange(size, color, currentQty + 1);
                          }}
                          className="px-3 py-1 border-l text-gray-700 hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVariants; 