
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

export const addToCartSlice = createSlice({
  name: 'addToCart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;

      // Check if the product already exists in the cart
      const existingItem = state.cart.find((item) => item.product._id === product._id); // Use _id instead of id for comparison
      
      if (existingItem) {
        // If the product exists, increment the quantity
        existingItem.quantity += quantity;
      } else {
        // If the product doesn't exist, add it as a new item
        state.cart.push({ product, quantity });
      }

      // Log the updated cart (this will show the state after the change)
      console.log("Updated Cart:", state.cart);
    },
    
    increaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.product._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.product._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.product._id !== action.payload);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = addToCartSlice.actions;

export default addToCartSlice.reducer;
;
