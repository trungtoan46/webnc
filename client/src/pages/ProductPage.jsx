import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { category, occasion, type, style } = useParams();

  // Xác định danh mục hiện tại
  const currentCategory = category || occasion || type || style;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Danh mục: {currentCategory}</h1>
      {/* Hiển thị danh sách sản phẩm */}
      <p>Đây là trang hiển thị sản phẩm cho danh mục "{currentCategory}".</p>
    </div>
  );
};

export default ProductPage;