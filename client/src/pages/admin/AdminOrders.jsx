import React, { useState, useEffect } from 'react';
import { Box, Heading, Button, Text, Select } from '@primer/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/admin/orders');
      setOrders(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Lỗi khi tải danh sách đơn hàng');
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}`, { status: newStatus });
      toast.success('Cập nhật trạng thái thành công');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Lỗi khi cập nhật trạng thái');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'processing':
        return 'blue';
      case 'shipped':
        return 'purple';
      case 'delivered':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  if (loading) {
    return <Text>Đang tải...</Text>;
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Quản lý đơn hàng</Heading>

      <Table>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Ngày đặt</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user_id?.name || 'Khách vãng lai'}</td>
              <td>{order.total.toLocaleString('vi-VN')} VNĐ</td>
              <td>
                <Select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  sx={{ 
                    backgroundColor: getStatusColor(order.status),
                    color: 'white',
                    border: 'none'
                  }}
                >
                  <option value="pending">Chờ xử lý</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="shipped">Đang giao hàng</option>
                  <option value="delivered">Đã giao hàng</option>
                  <option value="cancelled">Đã hủy</option>
                </Select>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
              <td>
                <Button variant="outline" onClick={() => {/* Xem chi tiết */}}>
                  Chi tiết
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default AdminOrders; 