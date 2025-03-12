import { createSlice } from "@reduxjs/toolkit";


const profileSlice = createSlice({
    name:'profile',
    initialState:{
        editProfile:false,
        viewProfile:false
    },
    reducers:{
        setEditProfile:(state,action)=>{state.editProfile=action.payload;},
        setViewProfile:(state,action)=>{state.viewProfile=action.payload;}
    }
});

export const {setEditProfile,setViewProfile} = profileSlice.actions;
export default profileSlice.reducer;