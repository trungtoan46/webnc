import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          status: selectedStatus !== 'all' ? selectedStatus : undefined
        }
      });
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'processing':
        return 'Đang xử lý';
      case 'shipped':
        return 'Đang giao hàng';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Đơn hàng của tôi</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">Tất cả</option>
                  <option value="pending">Chờ xử lý</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="shipped">Đang giao hàng</option>
                  <option value="delivered">Đã giao hàng</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">Không có đơn hàng nào</h3>
                <p className="mt-2 text-gray-500">Bạn chưa có đơn hàng nào trong danh sách này.</p>
                <div className="mt-6">
                  <Link
                    to="/products"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Mua sắm ngay
                  </Link>
                </div>
              </div>
            ) : (
              orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Đơn hàng #{order._id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Ngày đặt: {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <span className="text-lg font-medium text-gray-900">
                          {formatPrice(order.totalAmount)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">Sản phẩm</h4>
                          <div className="mt-2 space-y-2">
                            {order.products.map((item) => (
                              <div key={item._id} className="flex items-center">
                                <img
                                  src={item.product.thumbnail}
                                  alt={item.product.name}
                                  className="h-12 w-12 rounded-md object-cover"
                                />
                                <div className="ml-4">
                                  <p className="text-sm font-medium text-gray-900">
                                    {item.product.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {item.quantity} x {formatPrice(item.price)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <Link
                            to={`/orderdetail`}
                            state={{ orderId: order._id }}
                            className="text-sm font-medium text-blue-600 hover:text-blue-500"
                          >
                            Xem chi tiết
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">Không có đơn hàng nào</h3>
                  <p className="mt-2 text-gray-500">Bạn chưa có đơn hàng nào trong danh sách này.</p>
                  <div className="mt-6">
                    <Link
                      to="/products"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Mua sắm ngay
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order; 