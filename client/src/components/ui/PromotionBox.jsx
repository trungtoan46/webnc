import React, { useState } from 'react';
import { toast } from 'react-toastify';

const PromotionBox = ({ promoCode }) => {
  const [isCopied, setIsCopied] = useState(false);
  const code = promoCode ? promoCode : 'EGAFREESHIP';
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    console.log(isCopied);
    toast.success('Đã copy mã khuyến mãi');
  };
  
  return (
    <div className="border-dashed border-2 border-blue-700 rounded-lg px-2 py-4 max-h-[220px] relative  ">
      <h3 className="text-blue-600 font-semibold flex items-center gap-2 mb-3 absolute -top-[15px] left-2 bg-white">
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
  );
};

export default PromotionBox; 