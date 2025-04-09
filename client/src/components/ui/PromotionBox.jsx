import React from 'react';

const PromotionBox = () => {
  return (
    <div className="border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="text-blue-600 font-semibold flex items-center gap-2 mb-3">
        <span className="text-lg">🎁</span>
        KHUYẾN MÃI - ƯU ĐÃI
      </h3>
      <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <span>•</span>
          <span className="text-gray-500">Nhập mã EGAFREESHIP miễn phí vận chuyển đơn hàng</span>
        </li>
        <li className="flex items-start gap-2 text-red-500">
          <span>•</span>
          <span>Sao chép</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Đồng giá ship toàn quốc 25k</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Hỗ trợ 20k phí ship cho đơn hàng từ 200.000đ</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Miễn phí ship cho đơn hàng từ 500.000đ</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Đổi trả trong 30 ngày nếu sản phẩm lỗi bất kì</span>
        </li>
      </ul>
    </div>
  );
};

export default PromotionBox; 