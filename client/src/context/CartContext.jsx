import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Lỗi khi đọc giỏ hàng từ localStorage:', error);
        setCart([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingProductIndex = prevCart.findIndex(
        (item) => 
          item._id === product._id && 
          item.selectedSize === product.selectedSize && 
          item.selectedColor === product.selectedColor
      );

      if (existingProductIndex >= 0) {
        // Update quantity if product exists
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        return updatedCart;
      } else {
        // Add new product to cart
        return [...prevCart, product];
      }
    });
  };

  const removeFromCart = (productId, size, color) => {
    setCart((prevCart) => 
      prevCart.filter(
        (item) => 
          !(item._id === productId && 
            item.selectedSize === size && 
            item.selectedColor === color)
      )
    );
  };

  const updateQuantity = (productId, size, color, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId && 
        item.selectedSize === size && 
        item.selectedColor === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      // Kiểm tra xem item.price có tồn tại không trước khi sử dụng
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + (Number(item.quantity) || 0), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 