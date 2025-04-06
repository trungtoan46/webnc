import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api/api';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await api.get('/cart');
                const items = response.data;

                // Fetch full product details for each cart item
                const detailedItems = await Promise.all(items.map(async (item) => {
                    const productResponse = await api.get(`/products/${item.productId}`);
                    return { ...item, product: productResponse.data };
                }));

                setCartItems(detailedItems);
            } catch (error) {
                console.error('Error fetching cart items:', error);
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

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 pt-20">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Giỏ hàng trống</h1>
                        <p className="text-gray-500 mb-4">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                        <button 
                            onClick={() => navigate('/products')}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 pt-10">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold text-gray-700 mb-6">Giỏ hàng của bạn</h1>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Danh sách sản phẩm */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-4">
                                {cartItems.map(item => (
                                    <div key={item._id} className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b last:border-b-0">
                                        {/* Ảnh sản phẩm */}
                                        <div className="w-24 h-24 flex-shrink-0">
                                            <img 
                                                src={item.product?.thumbnail || 'https://placehold.co/300x200'} 
                                                alt={item.product?.name} 
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>

                                        {/* Thông tin sản phẩm */}
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-gray-800">{item.product?.name}</h3>
                                            <p className="text-gray-500 text-sm">
                                                {item.product?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </p>
                                        </div>

                                        {/* Số lượng và actions */}
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <div className="flex items-center border rounded-md">
                                                <button 
                                                    onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                                    className="p-2 hover:bg-gray-100 transition-colors"
                                                >
                                                    <FiMinus className="w-4 text-center text-gray-700 h-4" />
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
                                                    className="w-12 text-center text-gray-700 border-x py-1 focus:outline-none"
                                                />
                                                <button 
                                                    onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                                    className="p-2 hover:bg-gray-100 transition-colors"
                                                >
                                                    <FiPlus className="w-4 text-center text-gray-700 h-4" />
                                                </button>
                                            </div>
                                            <button 
                                                onClick={() => handleRemoveItem(item._id)}
                                                className="text-red-500 hover:text-red-600 transition-colors p-2"
                                            >
                                                <FiTrash2 className="w-5 text-center text-gray-700 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tổng tiền và thanh toán */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">Tổng đơn hàng</h2>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính</span>
                                    <span>{calculateTotalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span>Miễn phí</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Tổng cộng</span>
                                        <span className="text-blue-600">{calculateTotalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleCheckout}
                                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors font-medium"
                            >
                                Tiến hành thanh toán
                            </button>

                            <button 
                                onClick={() => navigate('/products')}
                                className="w-full mt-4 text-blue-500 hover:text-blue-600 transition-colors font-medium"
                            >
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
