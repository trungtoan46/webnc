import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api/api';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await api.get('/cart');
                const items = response.data;

                const detailedItems = await Promise.all(items.map(async (item) => {
                    const productResponse = await api.get(`/products/${item.productId}`);
                    return { ...item, product: productResponse.data };
                }));

                setCartItems(detailedItems);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0);
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await api.delete(`/cart/${itemId}`);
            setCartItems(cartItems.filter(item => item._id !== itemId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleUpdateQuantity = async (itemId, quantity) => {
        if (quantity < 1) return;
        try {
            await api.put(`/cart/${itemId}`, { quantity });
            setCartItems(cartItems.map(item => 
                item._id === itemId ? { ...item, quantity } : item
            ));
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };  

    const handleCheckout = async () => {
        try {
            await api.post('/checkout');
            navigate('/checkout');
        } catch (error) {
            console.error('Error checking out:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
                        <div className="mb-6">
                            <FiShoppingBag className="w-16 h-16 mx-auto text-gray-400" />
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Giỏ hàng trống</h1>
                        <p className="text-gray-500 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                        <button 
                            onClick={() => navigate('/products')}
                            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 hover:shadow-lg inline-flex items-center gap-2"
                        >
                            Tiếp tục mua sắm
                            <FiArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Giỏ hàng của bạn</h1>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Danh sách sản phẩm */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6">
                                {cartItems.map((item, index) => (
                                    <div 
                                        key={item._id} 
                                        className={`flex flex-col sm:flex-row items-center gap-6 py-6 
                                            ${index !== cartItems.length - 1 ? 'border-b border-gray-100' : ''}`}
                                    >
                                        {/* Ảnh sản phẩm */}
                                        <div className="w-32 h-32 flex-shrink-0 group">
                                            <img 
                                                src={item.product?.thumbnail || 'https://placehold.co/300x200'} 
                                                alt={item.product?.name} 
                                                className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Thông tin sản phẩm */}
                                        <div className="flex-grow text-center sm:text-left">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.product?.name}</h3>
                                            <p className="text-blue-600 font-medium mb-2">
                                                {item.product?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Thành tiền: {(item.product?.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </p>
                                        </div>

                                        {/* Số lượng và actions */}
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                                                <button 
                                                    onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                                    className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                                                >
                                                    <FiMinus className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <input 
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => {
                                                        const value = parseInt(e.target.value);
                                                        if (!isNaN(value) && value > 0) {
                                                            handleUpdateQuantity(item._id, value);
                                                        }
                                                    }}
                                                    className="w-14 text-center bg-white border-x border-gray-200 py-2 focus:outline-none text-gray-700"
                                                />
                                                <button 
                                                    onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                                    className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                                                >
                                                    <FiPlus className="w-4 h-4 text-gray-600" />
                                                </button>
                                            </div>
                                            <button 
                                                onClick={() => handleRemoveItem(item._id)}
                                                className="text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                                            >
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tổng tiền và thanh toán */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Tổng đơn hàng</h2>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính</span>
                                    <span className="font-medium">{calculateTotalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span className="text-green-500 font-medium">Miễn phí</span>
                                </div>
                                <div className="border-t border-dashed pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-800">Tổng cộng</span>
                                        <span className="text-xl font-bold text-blue-600">{calculateTotalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleCheckout}
                                className="w-full bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-[1.02] hover:shadow-lg font-semibold text-lg"
                            >
                                Tiến hành thanh toán
                            </button>

                            <button 
                                onClick={() => navigate('/products')}
                                className="w-full mt-4 text-blue-500 hover:text-blue-600 transition-colors font-medium flex items-center justify-center gap-2"
                            >
                                <span>Tiếp tục mua sắm</span>
                                <FiArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
