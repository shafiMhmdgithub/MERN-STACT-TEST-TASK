// src/Authentication/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    toggleAuthPage(state){
      state.isLogin=!state.isLogin;
    }
  },
});

export const { login, logout,toggleAuthPage } = authSlice.actions;
export default authSlice.reducer;


