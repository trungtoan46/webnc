import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [totalOrders, setTotalOrders] = useState(0);
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setOrders(response.data.orders);
      setTotalOrders(response.data.orders.totalAmount);   
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error loading orders');
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/orders/admin/${orderId}/status`, {
        status: newStatus 
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Order status updated successfully');
      fetchOrders(); // Refresh the orders list
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Error updating order status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };
  const fetchuserbyid = async (userId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    setUser(response.data.data.username);
  }
  useEffect(() => {
    if (orders.length > 0) {
      fetchuserbyid(orders[0].user);
    }
  }, [orders]);

  
 

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(orders) && orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Không có đơn hàng nào.
                </td>
              </tr>
            ) : (
              Array.isArray(orders) && orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.totalAmount } đ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={selectedStatus}
                      onChange={(e) => {
                        setSelectedStatus(e.target.value);
                        updateOrderStatus(order._id, e.target.value);
                      }}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Update Status</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
