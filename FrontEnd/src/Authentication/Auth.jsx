import React, { useState } from 'react';
import LoginPage from './LoginPage';  
import SignUpPage from './SignUpPage'; 
import { useDispatch, useSelector } from 'react-redux';
import { toggleAuthPage } from '../redux/authSlice';

const Auth = () => {
  const dispatch = useDispatch();
 const isLogin = useSelector((state)=>state.auth.isLogin)

 const handleToggleAuth=()=>{
  dispatch(toggleAuthPage);
 }
  return (
    <div>
      {isLogin ? (
        <LoginPage  toggleAuth={handleToggleAuth}/>
      ) : (
        <SignUpPage toggleAuth={handleToggleAuth} />
      )}
    </div>
  );
};

export default Auth;
