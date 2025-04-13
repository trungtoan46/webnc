import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();

    const handleRemoveItem = (productId, selectedSize, selectedColor) => {
        removeFromCart(productId, selectedSize, selectedColor);
        toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    };

    const handleUpdateQuantity = (productId, selectedSize, selectedColor, newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantity(productId, selectedSize, selectedColor, newQuantity);
    };  

    const handleCheckout = () => {
        // Chuyển đến trang thanh toán
        navigate('/checkout');
    };

    if (cart.length === 0) {
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
                                {cart.map((item, index) => (
                                    <div 
                                        key={`${item._id}-${item.selectedSize}-${item.selectedColor}`} 
                                        className={`flex flex-col sm:flex-row items-center gap-6 py-6 
                                            ${index !== cart.length - 1 ? 'border-b border-gray-100' : ''}`}
                                    >
                                        {/* Ảnh sản phẩm */}
                                        <div className="w-32 h-32 flex-shrink-0 group">
                                            <img 
                                                src={item.thumbnail || 'https://placehold.co/300x200'} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Thông tin sản phẩm */}
                                        <div className="flex-grow text-center sm:text-left">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
                                            <div className="mb-2">
                                                <span className="inline-block text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded mr-2 mb-1">
                                                    Size: {item.selectedSize}
                                                </span>
                                                <span className="inline-block text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded mb-1">
                                                    Màu: {item.selectedColor}
                                                </span>
                                            </div>
                                            <p className="text-blue-600 font-medium mb-2">
                                            {item.price?.toLocaleString() || '0'}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Thành tiền: {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                                            </p>
                                        </div>

                                        {/* Số lượng và actions */}
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                                                <button 
                                                    onClick={() => handleUpdateQuantity(item._id, item.selectedSize, item.selectedColor, item.quantity - 1)}
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
                                                            handleUpdateQuantity(item._id, item.selectedSize, item.selectedColor, value);
                                                        }
                                                    }}
                                                    className="w-14 text-center bg-white border-x border-gray-200 py-2 focus:outline-none text-gray-700"
                                                />
                                                <button 
                                                    onClick={() => handleUpdateQuantity(item._id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                                                    className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                                                >
                                                    <FiPlus className="w-4 h-4 text-gray-600" />
                                                </button>
                                            </div>
                                            <button 
                                                onClick={() => handleRemoveItem(item._id, item.selectedSize, item.selectedColor)}
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
                                    <span className="font-medium">{getCartTotal().toLocaleString('vi-VN')}₫</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span className="text-green-500 font-medium">Miễn phí</span>
                                </div>
                                <div className="border-t border-dashed pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-800">Tổng cộng</span>
                                        <span className="text-xl font-bold text-blue-600">{getCartTotal().toLocaleString('vi-VN')}₫</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleCheckout}
                                className="btn-15"
                            >
                                <span>Thanh toán</span>
                            </button>

                            <style jsx>{`
                                    .btn-15,
                                    .btn-15 *,
                                    .btn-15 :after,
                                    .btn-15 :before,
                                    .btn-15:after,
                                    .btn-15:before {
                                    border: 0 solid;
                                    box-sizing: border-box;
                                    }
                                    .btn-15 {
                                    -webkit-tap-highlight-color: transparent;
                                    -webkit-appearance: button;
                                    background-color: #000;
                                    background-image: none;
                                    color: #fff;
                                    cursor: pointer;
                                    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
                                        Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
                                        Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
                                    font-size: 100%;
                                    font-weight: 900;
                                    line-height: 1.5;
                                    margin: 0;
                                    -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
                                    padding: 0;
                                    text-transform: uppercase;
                                    }
                                    .btn-15:disabled {
                                    cursor: default;
                                    }
                                    .btn-15:-moz-focusring {
                                    outline: auto;
                                    }
                                    .btn-15 svg {
                                    display: block;
                                    vertical-align: middle;
                                    }
                                    .btn-15 [hidden] {
                                    display: none;
                                    }
                                    .btn-15 {
                                    border-radius: 99rem;
                                    border-width: 2px;
                                    overflow: hidden;
                                    padding: 0.8rem 3rem;
                                    position: relative;
                                    z-index: 0;
                                    }
                                    .btn-15 span {
                                    mix-blend-mode: difference;
                                    }
                                    .btn-15:after,
                                    .btn-15:before {
                                    --skew: 0.2;
                                    background: #fff;
                                    content: "";
                                    display: block;
                                    height: 102%;
                                    left: calc(-50% - 50% * var(--skew));
                                    pointer-events: none;
                                    position: absolute;
                                    top: -104%;
                                    transform: skew(calc(150deg * var(--skew))) translateY(var(--progress, 0));
                                    transition: transform 0.2s ease;
                                    width: 100%;
                                    }
                                    .btn-15:after {
                                    --progress: 0%;
                                    left: calc(50% + 50% * var(--skew));
                                    top: 102%;
                                    z-index: -1;
                                    
                                    }
                                    .btn-15:hover:before {
                                    --progress: 100%;
                                    }
                                    .btn-15:hover:after {
                                    --progress: -102%;
                                    }
                                `}</style>

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
