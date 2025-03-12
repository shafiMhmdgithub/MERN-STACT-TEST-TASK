


import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: [],
    viewAllUser: false,
    viewAddUser: false,
  },
  reducers: {
    addNewUser: (state, action) => {
      console.log("Adding user:", action.payload);
      if (Array.isArray(action.payload)) {
        state.user.push(...action.payload);
      } else {
        state.user.push(action.payload);
      }
    },
    showAddUser: (state) => {
      state.viewAllUser = false; // Ensure viewAllUser is false
      state.viewAddUser = true;   // Show AddUser form
    },
    showAllUser: (state) => {
      state.viewAllUser = true;  // Show All Users view
      state.viewAddUser = false; // Ensure AddUser form is hidden
    },
  },
});

export const userSliceActions = userSlice.actions;

export default userSlice.reducer;
