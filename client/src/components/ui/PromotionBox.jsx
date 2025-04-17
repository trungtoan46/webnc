import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import AnimedNumber from '../common/AnimedNumber';
const PromotionBox = ({ promoCode, product, isCart, selectedColor, selectedSize, quantity, setQuantity }) => {
  const code = promoCode ? promoCode : 'EGAFREESHIP';
  const { addToCart } = useCart();
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success('Đã copy mã khuyến mãi');
  };

  const handleAddToCart = async (product, quantity, selectedColor, selectedSize) => {
    if (!selectedColor) {
      toast.error('Vui lòng chọn màu sắc');
      return;
    }
    if (quantity > currentStock) {
      toast.warn('Số lượng yêu cầu vượt quá số lượng tồn kho!');
      return;
    }

    if (!selectedSize) {
      toast.error('Vui lòng chọn kích thước');
      return;
    }

    if (product.quantity <= 0) {
      toast.error('Sản phẩm đã hết hàng');
      return;
    }
  
    try {
      await addToCart({
        ...product,
        selectedSize, 
        selectedColor,
        quantity
      }); 
      
      toast.success('Đã thêm vào giỏ hàng');
    } catch (err) {
      console.error('Error adding to cart:', err.response?.data || err.message);
      toast.error('Thêm vào giỏ hàng thất bại. Vui lòng thử lại.');
    }
  };

  const getSelectedVariantStock = () => {
    if (!selectedColor || !selectedSize || !Array.isArray(product.variants)) return 0;
    
    const selectedVariant = product.variants.find(
      variant => variant.color === selectedColor && variant.size === selectedSize
    );
    
    return selectedVariant ? selectedVariant.stock : 0;
  };

  const currentStock =getSelectedVariantStock();


  const handleQuantityChange = (value) => {
    

    if (typeof value === 'number') {
      const newQuantity = quantity + value;
      if (newQuantity > 0) {
        setQuantity(newQuantity);
      }
    } else if (value && value.target) {
      const inputValue = parseInt(value.target.value);
      if (!isNaN(inputValue) && inputValue > 0) {
        setQuantity(inputValue);
      }
    }
  };
  
  return (
    <div>
      <div className="border-dashed border-2 border-blue-700 rounded-lg px-2 py-4 max-h-[220px] relative">
        <h3 className="text-blue-600 font-semibold flex items-center 
        gap-2 mb-3 absolute -top-[15px] left-2 bg-white px-1">
          <span className="text-lg">🎁</span>
          KHUYẾN MÃI - ƯU ĐÃI
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className='text-gray-500'>•</span>
            <span className="text-black text-sm">Nhập mã {code} miễn phí vận chuyển đơn hàng</span>
          </li>
          <li className="flex items-start gap-2 text-red-500">
            <span className='text-gray-500'>•</span>
            <span 
            onClick={handleCopy}
            className='cursor-pointer'
            >Sao chép</span>
          </li>
          <li className="flex items-start gap-2">
            <span className='text-gray-500'>•</span>
            <span className='text-black text-sm'>Đồng giá ship toàn quốc 25k</span>
          </li>
          <li className="flex items-start gap-2">
            <span className='text-gray-500'>•</span>
            <span className='text-black text-sm'>Hỗ trợ 20k phí ship cho đơn hàng từ 200.000đ</span>
          </li>
          <li className="flex items-start gap-2">
            <span className='text-gray-500'>•</span>
            <span className='text-black text-sm'>Miễn phí ship cho đơn hàng từ 500.000đ</span>
          </li>
          <li className="flex items-start gap-2">
            <span className='text-gray-500'>•</span>
            <span className='text-black text-sm'>Đổi trả trong 30 ngày nếu sản phẩm lỗi bất kì</span>
          </li>
        </ul>
      </div>
      {isCart && (
        <div className='flex items-center gap-10 mt-4'>
          <div className='w-4/12 flex items-center gap-0 h-full border-2 border-gray-500 rounded-md'>
            <div className='w-full h-10 rounded-md items-center justify-center flex'>
            <AnimedNumber value={quantity} onChange={handleQuantityChange} min={1} max={product.stock} />
            </div>
          </div>
          <button 
          onClick={() => handleAddToCart(product, quantity, selectedColor, selectedSize)}
          className='bg-blue-600 text-white px-4 py-2 rounded-md'>
            Thêm vào giỏ
          </button>
        </div>
      )}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </div>
  );
};

export default PromotionBox; 