import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Voucher = ({ isOpen, onClose, coupons = [] }) => {
  // Ngăn cuộn khi voucher đang mở
  useEffect(() => {
    if (isOpen) {
      // Lưu trạng thái cuộn trước khi khóa
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Khôi phục lại khi đóng
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Mã giảm giá mẫu nếu không có dữ liệu truyền vào
  const defaultCoupons = [
    { code: 'FREESHIP', discount: 'Miễn phí vận chuyển', minOrder: 500000, exp: '31/12/2025' },
    { code: 'SALE10', discount: 'Giảm 10%', minOrder: 300000, exp: '31/12/2025' },
    { code: 'SALE50K', discount: 'Giảm 50,000đ', minOrder: 200000, exp: '31/12/2025' },
    { code: 'NEW20', discount: 'Giảm 20% cho khách hàng mới', minOrder: 0, exp: '31/12/2025' },
  ];
  
  const vouchersToShow = coupons.length > 0 ? coupons : defaultCoupons;
  
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('Đã copy mã khuyến mãi ' + code);
  };

  return (
    <>
      {/* Overlay xám làm mờ màn hình chính */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel voucher */}
      <div className="fixed right-0 top-0 h-full bg-white w-80 md:w-96 z-50 shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out">
        <div className="p-5 bg-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Mã Khuyến Mãi</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {vouchersToShow.map((voucher, index) => (
            <div key={index} className="border border-dashed border-blue-300 rounded-lg p-4 bg-blue-50 relative">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-white rounded-r-full"></div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-white rounded-l-full"></div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-blue-800 text-lg">{voucher.code}</span>
                <button 
                  onClick={() => handleCopyCode(voucher.code)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  Sao chép
                </button>
              </div>
              
              <p className="text-blue-700 font-medium">{voucher.discount}</p>
              
              <div className="text-sm text-gray-600 mt-2">
                {voucher.minOrder > 0 && (
                  <p>Đơn tối thiểu: {voucher.minOrder.toLocaleString()}₫</p>
                )}
                <p>Hết hạn: {voucher.exp}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-gray-100">
          <p className="text-sm text-gray-500 text-center">
            Nhập mã khuyến mãi ở trang thanh toán để được giảm giá
          </p>
        </div>
      </div>
    </>
  );
};

export default Voucher;


