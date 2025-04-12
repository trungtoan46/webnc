import React, { useState, useEffect } from 'react';
import { Box, Heading, Button, Text } from '@primer/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users');
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Lỗi khi tải danh sách người dùng');
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`/api/admin/users/${userId}`, { role: newRole });
      toast.success('Cập nhật vai trò thành công');
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Lỗi khi cập nhật vai trò');
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axios.put(`/api/admin/users/${userId}`, { status: newStatus });
      toast.success('Cập nhật trạng thái thành công');
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Lỗi khi cập nhật trạng thái');
    }
  };

  if (loading) {
    return <Text>Đang tải...</Text>;
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Quản lý người dùng</Heading>

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
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                >
                  <option value="user">Người dùng</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              </td>
              <td>
                <select
                  value={user.status}
                  onChange={(e) => handleStatusChange(user._id, e.target.value)}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: user.status === 'active' ? '#e6f4ea' : '#fce8e6',
                    color: user.status === 'active' ? '#137333' : '#c5221f'
                  }}
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
              <td>
                <Button variant="outline" onClick={() => {/* Xem chi tiết */}}>
                  Chi tiết
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Box>
  );
};

export default AdminUsers; 