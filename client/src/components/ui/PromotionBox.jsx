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
     <div>
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

      <div className='flex items-center gap-10'>
        <div className='w-4/12 flex items-center gap-0 h-full border-2 border-gray-300 rounded-md'>
          <div className='w-full h-10  rounded-md items-center justify-center flex'>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGNJREFUWEft1cENgDAMBMFNHxQCfSCaTCGkkBSC+IMfyJJ5bAo4n8aK3Ch+rXg+FlBAAQUUUCASWIAt6VidwHzKigrsQE8qcLxl/brAvYI1SWB8WUHS7DjGb6iAAgoooEC5wAUX/wghZaOPjAAAAABJRU5ErkJggg==" alt="" className='w-4 h-4 cursor-pointer' />
          </div>
          <input type="number" className='w-20 text-black text-center h-10 
          rounded-md p-2 focus:outline-none focus:ring-0' defaultValue={1} />
          <div className='w-full h-10  rounded-md items-center justify-center flex'>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAItJREFUWEdjZBhgwDjA9jOMOmA0BCgJAVEGBgZtaCK+ysDA8JqcBE2JA8IYGBhWQi0FsVePOmA0BEZDgNohgJzPsZntwMDAUA+VaGBgYDiIxwE4ywl85QByPifHc8h6cJYTg9oBAx4FhIJ9tCgeDYHREBjwEBjwJhmhcoIoeUrahERZQEjRqANGQwAAsTYsIdME3f0AAAAASUVORK5CYII=" alt="" className='w-4 h-4 cursor-pointer' />
          </div>
        </div>
        <button className='bg-blue-600 text-white px-4 py-2 rounded-md'>
          Thêm vào giỏ
        </button>
      </div>


      </div>
    );
  };

  export default PromotionBox; 