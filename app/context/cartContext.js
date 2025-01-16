'use client';

import { createContext, useState, useEffect} from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

    // Load cart items from localStorage when the component mounts
    useEffect(() => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }, []);
  
    // Save cart items to localStorage whenever the cart changes
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);



  const addToCart = (product, quantity=1) => {
    setCartItems((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Update quantity if product already exists in the cart
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new product to the cart with quantity 1
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
