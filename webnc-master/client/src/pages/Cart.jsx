import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

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

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl text-gray-700 font-bold mb-4">Giỏ hàng</h1>
            
            {cartItems.length === 0 ? (
                <p className="text-gray-500">Giỏ hàng trống</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cartItems.map(item => (
                        <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex items-center justify-between mb-4">
                                <img 
                                    src={item.product?.image_url || 'https://placehold.co/300x200'} 
                                    alt={item.product?.name || 'Product Image'} 
                                    className="w-16 h-16 rounded-lg"
                                />
                                <div>
                                    <h2 className="text-lg font-bold">{item.product?.name || 'Unknown Product'}</h2>
                                    <p className="text-gray-500">
                                        {item.product?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || '0 VND'} x {item.quantity}
                                    </p>
                                </div>
                                <div>
                                    <button 
                                        onClick={() => handleRemoveItem(item._id)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <button 
                                        onClick={() => handleUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                        className="bg-gray-200 px-3 py-1 rounded-l"
                                    >
                                        -
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
                                        className="w-16 text-black text-center border-t border-b py-1"
                                        inputMode="numeric" 
                                    />
                                    <button 
                                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                        className="bg-gray-200 px-3 py-1 rounded-r"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-gray-500">
                                    Tổng cộng: {(item.product?.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || '0 VND'}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-between">
                        
                        <button 
                            onClick={handleCheckout}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
