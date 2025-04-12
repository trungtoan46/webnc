import React, { useEffect } from 'react';
import { FaTimes, FaRuler } from 'react-icons/fa';
import { GiArmoredPants, GiMonclerJacket } from 'react-icons/gi';
import useClickOutside from '../../hooks/useClickOutside';

const SelectSize = ({ isOpen, onClose, category = 'ao' }) => {
  const ref = useClickOutside(() => onClose());
  // Ngăn cuộn khi popup đang mở
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

  // Dữ liệu bảng kích thước cho áo
  const sizeChartShirt = [
    { size: 'S', chest: '92-96', shoulder: '42-44', length: '68-70', sleeve: '59-60' },
    { size: 'M', chest: '96-100', shoulder: '44-46', length: '70-72', sleeve: '60-61' },
    { size: 'L', chest: '100-104', shoulder: '46-48', length: '72-74', sleeve: '61-62' },
    { size: 'XL', chest: '104-108', shoulder: '48-50', length: '74-76', sleeve: '62-63' },
    { size: '2XL', chest: '108-114', shoulder: '50-52', length: '76-78', sleeve: '63-64' },
  ];

  // Dữ liệu bảng kích thước cho quần
  const sizeChartPants = [
    { size: 'S', waist: '70-74', hip: '88-92', length: '98-100', thigh: '54-56' },
    { size: 'M', waist: '74-78', hip: '92-96', length: '100-102', thigh: '56-58' },
    { size: 'L', waist: '78-82', hip: '96-100', length: '102-104', thigh: '58-60' },
    { size: 'XL', waist: '82-86', hip: '100-104', length: '104-106', thigh: '60-62' },
    { size: '2XL', waist: '86-90', hip: '104-108', length: '106-108', thigh: '62-64' },
  ];

  const sizeChart = category === 'quan' ? sizeChartPants : sizeChartShirt;

  return (
    <>
      {/* Overlay xám làm mờ màn hình chính */}
      <div 
        ref={ref}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Popup hướng dẫn chọn size */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-all">
          <div className="p-5 bg-gray-100 flex justify-between items-center sticky top-0 z-10">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaRuler className="text-blue-600" />
              Bảng kích thước {category === 'quan' ? 'quần' : 'áo'}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>
          
          <div className="p-6">
            {/* Icon sản phẩm */}
            <div className="flex justify-center mb-6">
              {category === 'quan' ? (
                <GiArmoredPants className="text-6xl text-blue-500" />
              ) : (
                <GiMonclerJacket className="text-6xl text-blue-500" />
              )}
            </div>
            
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">Size</th>
                      {category === 'quan' ? (
                        <>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">Vòng eo (cm)</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">Vòng hông (cm)</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">Dài quần (cm)</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">Vòng đùi (cm)</th>
                        </>
                      ) : (
                        <>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">Vòng ngực (cm)</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">Vai (cm)</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">Dài áo (cm)</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">Tay áo (cm)</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sizeChart.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.size}</td>
                        {category === 'quan' ? (
                          <>
                            <td className="py-3 px-4 text-sm text-gray-700">{item.waist}</td>
                            <td className="py-3 px-4 text-sm text-gray-700">{item.hip}</td>
                            <td className="py-3 px-4 text-sm text-gray-700">{item.length}</td>
                            <td className="py-3 px-4 text-sm text-gray-700">{item.thigh}</td>
                          </>
                        ) : (
                          <>
                            <td className="py-3 px-4 text-sm text-gray-700">{item.chest}</td>
                            <td className="py-3 px-4 text-sm text-gray-700">{item.shoulder}</td>
                            <td className="py-3 px-4 text-sm text-gray-700">{item.length}</td>
                            <td className="py-3 px-4 text-sm text-gray-700">{item.sleeve}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <p className="text-sm text-gray-500 mt-2 italic">
                * Kích thước được đo bằng cm và có thể sai số ±1-2cm
              </p>
            </div>

            <div className="bg-blue-50 p-5 rounded-lg mb-6">
              <h4 className="font-medium text-blue-700 mb-3">Lời khuyên khi chọn size</h4>
              <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Nếu số đo của bạn nằm giữa hai size, hãy chọn size lớn hơn để thoải mái.</li>
                <li>Nếu bạn thích mặc rộng rãi, hãy chọn size lớn hơn 1 cỡ.</li>
                <li>Với quần jean/quần dài, có thể đo quần bạn đang mặc vừa để tham khảo.</li>
                <li>Đối với áo khoác, nên chọn size rộng hơn một chút để có thể mặc nhiều lớp bên trong.</li>
                <li>Với áo thun/áo sơ mi, size vừa vặn sẽ tôn dáng hơn size quá rộng.</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Cần hỗ trợ thêm?</h3>
              <p className="text-sm text-gray-600">
                Nếu bạn không chắc chắn về kích thước của mình, hãy liên hệ với chúng tôi qua số điện thoại <strong>1800.0000</strong> hoặc gửi email đến <strong>support@shop.com</strong>.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectSize;
