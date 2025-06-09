"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === newItem.id && item.color === newItem.color
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (itemId, color) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === itemId && item.color === color)
      )
    );
  };

  const updateQuantity = (itemId, color, newQty) => {
    if (newQty < 1) return; // opcional: evita cantidades 0 o negativas
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.color === color
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
