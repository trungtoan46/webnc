import { useEffect, useRef } from 'react';

// Hàm chuyển đổi chuỗi tiếng Việt thành slug
function convertToVietnameseSlug(str) {
    if (!str) return '';
    
    return str
      .normalize('NFD')                   // Tách các dấu ra khỏi ký tự
      .replace(/[\u0300-\u036f]/g, '')    // Xóa dấu
      .replace(/đ/g, 'd')                 // Chuyển đ -> d
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')       // Xóa ký tự đặc biệt
      .trim()
      .replace(/\s+/g, '-')               // Thay khoảng trắng bằng -
      .replace(/-+/g, '-');               // Gộp nhiều dấu - thành một
}

export default convertToVietnameseSlug;