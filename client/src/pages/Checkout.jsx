import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaArrowLeft, FaCreditCard, FaMoneyBill, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/logo.webp';
import api from '../services/api/api';

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cod'
  });

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Lấy thông tin giỏ hàng từ localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const cart = JSON.parse(storedCart);
        // Kiểm tra xem cart có phải là mảng không
        if (!Array.isArray(cart)) {
          throw new Error('Dữ liệu giỏ hàng không hợp lệ');
        }
        setCartItems(cart);

        // Tính tổng tiền
        const total = cart.reduce((sum, item) => {
          // Kiểm tra xem item có đủ thông tin không
          if (!item || typeof item !== 'object' || !item.price || !item.quantity) {
            return sum;
          }
          return sum + (item.price * item.quantity);
        }, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error('Lỗi khi đọc giỏ hàng:', error);
        toast.error('Không thể tải thông tin giỏ hàng');
        // Xóa giỏ hàng không hợp lệ
        localStorage.removeItem('cart');
        setCartItems([]);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra form
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error('Vui lòng điền đầy đủ thông tin giao hàng');
      return;
    }

    // Kiểm tra giỏ hàng
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      toast.error('Giỏ hàng trống hoặc không hợp lệ');
      return;
    }

    try {
      // Chuẩn bị dữ liệu sản phẩm
      const orderItems = cartItems.map(item => {
        // Kiểm tra và lấy thông tin sản phẩm
        if (!item || typeof item !== 'object') {
          throw new Error('Dữ liệu sản phẩm không hợp lệ');
        }

        // Đảm bảo dữ liệu sản phẩm có đúng định dạng
        const productData = {
          product: item._id || item.productId || item.product?._id,
          name: item.name || item.product?.name || '',
          price: item.price || item.product?.price || 0,
          quantity: item.quantity || 1,
          thumbnail: item.thumbnail || item.product?.thumbnail || ''
        };

        // Kiểm tra các trường bắt buộc
        if (!productData.product) {
          throw new Error('Thiếu ID sản phẩm');
        }

        return productData;
      });

      // Tạo đơn hàng mới
      const orderData = {
        user: localStorage.getItem('userId'),
        products: orderItems,
        shippingInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city
        },
        paymentMethod: formData.paymentMethod,
        totalAmount: totalPrice + 30000, // Tổng tiền + phí vận chuyển
        status: 'pending'
      };

      console.log('Dữ liệu đơn hàng:', orderData); // Log để debug

      const response = await api.post('/orders', orderData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data) {
        toast.success('Đặt hàng thành công!');
        // Xóa giỏ hàng
        localStorage.removeItem('cart');
        // Chuyển hướng đến trang cảm ơn
        navigate('/order-success');
      }
    } catch (error) {
      console.error('Lỗi khi đặt hàng:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Đặt hàng thất bại. Vui lòng thử lại!');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100'>


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-start gap-4 mb-8'>
          <img src={logo} alt="logo" className='w-auto h-20' />
          <div className='border-l-2 border border-blue-200 h-10'></div>
          <h1 className='text-2xl font-bold text-gray-600'>Thanh Toán</h1>
        </div>

        <div className="flex items-center mb-6">
          <button
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> <span>Quay lại</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Thông tin giao hàng */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-500" /> Thông tin giao hàng
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2 flex items-center">
                      <FaUser className="mr-2 text-gray-500" /> Họ tên
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                      placeholder="Nhập họ tên của bạn"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 flex items-center">
                      <FaPhone className="mr-2 text-gray-500" /> Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <FaEnvelope className="mr-2 text-gray-500" /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    placeholder="Nhập email của bạn"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gray-500" /> Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    placeholder="Nhập địa chỉ giao hàng"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-left text-gray-700 mb-2">Thành phố/Tỉnh</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    placeholder="Nhập thành phố/tỉnh"
                  />
                </div>
              </form>
            </div>

            {/* Phương thức thanh toán */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                <FaCreditCard className="mr-2 text-blue-500" /> Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 text-gray-800">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <FaMoneyBill className="text-green-500 mr-2" />
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </label>

                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 text-gray-800">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <FaCreditCard className="text-blue-500 mr-2" />
                  <span>Thanh toán bằng thẻ tín dụng/ghi nợ</span>
                </label>
              </div>
            </div>
          </div>

          {/* Tổng kết đơn hàng */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Tổng kết đơn hàng</h2>

              <div className="max-h-60 overflow-y-auto mb-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div key={index} className="flex items-center py-3 border-b">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.thumbnail || 'https://via.placeholder.com/150'}
                          alt={item.name}
                          className="h-full w-3/4 m-auto object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                        <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                        <p className="text-sm font-medium text-gray-900">{(item.price * item.quantity).toLocaleString()}₫</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-4">Giỏ hàng trống</p>
                )}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Tạm tính:</span>
                  <span className="font-medium text-gray-800">{totalPrice.toLocaleString()}₫</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Phí vận chuyển:</span>
                  <span className="font-medium text-gray-800">30,000₫</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-4 pt-2 border-t">
                  <span className="text-gray-800">Tổng cộng:</span>
                  <span className="text-blue-700">{(totalPrice + 30000).toLocaleString()}₫</span>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
              >
                Xác nhận đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
