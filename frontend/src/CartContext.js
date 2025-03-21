// // CartContext.js
// import React, { createContext, useState } from 'react';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (productId) => {
//     if (cartItems.includes(productId)){
//       alert("already present in the cart")
//       return
//     }
//     else{
//     setCartItems((prevItems) => [...prevItems, productId]);
//     }
//   };

//   const removeFromCart = (productId) => {
//     console.log("Removing product with ID:", productId);
//     setCartItems((prevItems) => prevItems.filter(item => item !== productId));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
