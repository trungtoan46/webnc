import React, { useState } from 'react';
import { Search, Package, Truck, CreditCard, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../services/api/api';

const CheckOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      toast.error('Vui lòng nhập mã đơn hàng');
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/orders/${orderId}`);
      if (response.data.order) {
        setOrder(response.data.order);
      }
    } catch (error) {
      console.error('Error checking order:', error);
      toast.error('Không tìm thấy đơn hàng với mã này');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
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
        <div className="max-w-md mx-auto mb-8">
          <div className="text-center mb-8">
            <Package className="mx-auto h-12 w-12 text-blue-600" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Tra cứu đơn hàng</h2>
            <p className="mt-2 text-gray-600 text-sm">
              Nhập mã đơn hàng của bạn để kiểm tra thông tin
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                  Mã đơn hàng
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="orderId"
                    className="block w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Nhập mã đơn hàng của bạn"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Mã đơn hàng là dãy ký tự được cung cấp khi bạn đặt hàng thành công
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Đang kiểm tra...
                  </>
                ) : (
                  'Kiểm tra đơn hàng'
                )}
              </button>
            </form>
          </div>
        </div>

        {order && (
          <div className="space-y-6 animate-fade-in">
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Đơn hàng #{order._id}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Info Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-medium text-gray-900">Thông tin giao hàng</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">{order.shippingInfo?.fullName || 'Không có thông tin'}</span>
                    </p>
                    <p className="text-sm text-gray-500">{order.shippingInfo?.phone || 'Không có thông tin'}</p>
                    <p className="text-sm text-gray-500">{order.shippingInfo?.email || 'Không có thông tin'}</p>
                    <p className="text-sm text-gray-500">{order.shippingInfo?.address || 'Không có thông tin'}</p>
                  </div>
                </div>
              </div>

              {/* Payment Info Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-medium text-gray-900">Thông tin thanh toán</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Phương thức thanh toán:</span>{' '}
                      {order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}
                    </p>
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Trạng thái:</span>{' '}
                      {getStatusText(order.status)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-medium text-gray-900">Sản phẩm</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden border border-gray-200 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Sản phẩm
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Đơn giá
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Số lượng
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Thành tiền
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {order.products && order.products.length > 0 ? (
                            order.products.map((item) => (
                              <tr key={item._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <img
                                      src={item.product?.thumbnail || '/placeholder-image.jpg'}
                                      alt={item.product?.name || 'Sản phẩm'}
                                      className="h-16 w-16 rounded-lg object-cover"
                                    />
                                    <div className="ml-4">
                                      <p className="text-sm font-medium text-gray-900">
                                        {item.product?.name || 'Không có tên sản phẩm'}
                                      </p>
                                      {item.product?.variants && item.product.variants.length > 0 && (
                                        <p className="text-sm text-gray-500">
                                          {item.product.variants[0].size} / {item.product.variants[0].color}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatPrice(item.price || 0)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {item.quantity || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {formatPrice((item.price || 0) * (item.quantity || 0))}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                Không có sản phẩm nào trong đơn hàng
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex justify-end">
                    <div className="w-full sm:w-1/2 lg:w-1/3">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-medium text-gray-900">Tổng cộng</span>
                        <span className="text-lg font-bold text-blue-600">{formatPrice(order.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOrder;
