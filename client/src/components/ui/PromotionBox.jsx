import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import useClickOutside from '../../hooks/useClickOutside';
import api from '../../services/api/api';
import { addToCart } from '../../services/api/api';

const PromotionBox = ({ promoCode, product }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [quantity, setQuantity] = useState(1);
  console.log(product);
  const code = promoCode ? promoCode : 'EGAFREESHIP';
  useEffect(() => {
    
    handleAddToCart();
  }, []);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast.success('Đã copy mã khuyến mãi');
  };
  const handleAddToCart = async (product, quantity) => {
    if (!product) {
      alert('Product information is not available.');
      return;
    }
  
    if (quantity < 1) {
      alert('Quantity must be at least 1.');
      return;
    }
  
    try {
      
      await addToCart({ productId: product._id, quantity });
      toast.success('Đã thêm vào giỏ hàng');
    } catch (err) {
      console.error('Error adding to cart:', err.response?.data || err.message);
      toast.error('Failed to add product to cart. Please try again.');
    }
  };
  
  const handleQuantityChange = (value) => {
    // Nếu value là số âm hoặc dương (từ nút tăng/giảm)
    if (typeof value === 'number') {
      const newQuantity = quantity + value;
      if (newQuantity >= 1) {
        setQuantity(newQuantity);
      }
    } 
    // Nếu value là event từ input
    else if (value && value.target) {
      const inputValue = parseInt(value.target.value);
      if (!isNaN(inputValue) && inputValue >= 1) {
        setQuantity(inputValue);
      }
    }
  };
  
  return (
   <div
   >
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

    <div className='flex items-center gap-10 mt-4'>
      <div className='w-4/12 flex items-center gap-0 h-full border-2 border-gray-300 rounded-md'>
        <div className='w-full h-10 rounded-md items-center justify-center flex'>
          <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGNJREFUWEft1cENgDAMBMFNHxQCfSCaTCGkkBSC+IMfyJJ5bAo4n8aK3Ch+rXg+FlBAAQUUUCASWIAt6VidwHzKigrsQE8qcLxl/brAvYI1SWB8WUHS7DjGb6iAAgoooEC5wAUX/wghZaOPjAAAAABJRU5ErkJggg==" 
          alt="" 
          className='w-4 h-4 cursor-pointer' 
          onClick={() => handleQuantityChange(-1)}
          />
        </div>
        <input 
          type="number" 
          className='w-20 text-black text-center h-10 rounded-md p-2 focus:outline-none focus:ring-0' 
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
        <div className='w-full h-10 rounded-md items-center justify-center flex'>
          <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAItJREFUWEdjZBhgwDjA9jOMOmA0BCgJAVEGBgZtaCK+ysDA8JqcBE2JA8IYGBhWQi0FsVePOmA0BEZDgNohgJzPsZntwMDAUA+VaGBgYDiIxwE4ywl85QByPifHc8h6cJYTg9oBAx4FhIJ9tCgeDYHREBjwEBjwJhmhcoIoeUrahERZQEjRqANGQwAAsTYsIdME3f0AAAAASUVORK5CYII=" 
          alt="" 
          className='w-4 h-4 cursor-pointer' 
          onClick={() => handleQuantityChange(1)}
          />
        </div>
      </div>
      <button 
      onClick={() => handleAddToCart( product, quantity)}
      className='bg-blue-600 text-white px-4 py-2 rounded-md'>
        Thêm vào giỏ
      </button>
    </div>
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