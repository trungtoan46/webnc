import React, { useState, useEffect } from 'react';
import { Box, Heading, Button, Text } from '@primer/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/admin/products',{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Lỗi khi tải danh sách sản phẩm');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await axios.delete(`/api/admin/products/${id}`);
        toast.success('Xóa sản phẩm thành công');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Lỗi khi xóa sản phẩm');
      }
    }
  };

  if (loading) {
    return <Text>Đang tải...</Text>;
  }

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading>Quản lý sản phẩm</Heading>
        <Button onClick={() => navigate('/admin/products/add')}>
          Thêm sản phẩm mới
        </Button>
      </Box>

      <Box
        as="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          '& th, & td': {
            p: 3,
            borderBottom: '1px solid',
            borderColor: 'border.default',
            textAlign: 'left'
          },
          '& th': {
            fontWeight: 'bold',
            bg: 'canvas.subtle'
          }
        }}
      >
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Danh mục</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.price.toLocaleString('vi-VN')} VNĐ</td>
              <td>{product.quantity}</td>
              <td>{product.category_id?.name || 'Chưa phân loại'}</td>
              <td>
                <Box display="flex" gap={2}>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                  >
                    Sửa
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDelete(product._id)}
                  >
                    Xóa
                  </Button>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Box>
  );
};

export default AdminProducts; 