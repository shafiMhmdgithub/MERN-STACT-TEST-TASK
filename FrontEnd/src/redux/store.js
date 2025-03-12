
import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
import profileSlice from './profileSlice';
import productSlice from './productSlice';
import addToCartSlice from './addToCartSlice';
import userSlice from "./userSlice";
import fetchStatusSlice from "./fetchStatusSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    product: productSlice,
    addToCart: addToCartSlice,
    fetchStatus: fetchStatusSlice,
    users: userSlice,
  },
 
});



