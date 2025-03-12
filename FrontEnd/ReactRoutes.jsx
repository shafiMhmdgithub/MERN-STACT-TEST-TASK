import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './src/dashboard/Dashboard';
import Auth from './src/Authentication/Auth';
import { EmailVerificationLandingPage } from './src/Authentication/EmailVerificationLandingPage';
import ForgotPasswordPage from './src/Authentication/ForgotPasswordPage';
import RecoverPasswordPage from './src/Authentication/RecoverPasswordPage';
import { PleaseVerifyEmailPage } from './src/Authentication/PleaseVerifyEmailPage';
import LoginPage from './src/Authentication/LoginPage';
import SignUpPage from './src/Authentication/SignUpPage';
import AddEditProducts from './src/dashboard/Products/AddEditProducts';
import Contact from './src/components/Contact';

const ReactRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage />} />
        <Route path="/please-verify" element={<PleaseVerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:passwordResetCode" element={<RecoverPasswordPage />} />

        <Route path='/add-edit-product/:productId?' element ={<AddEditProducts/>}/>
        {/* Dashboard Layout with nested routes */}
        <Route path="/dashboard" element={<Dashboard />} >
        <Route path='add-edit-product/:productId?' element ={<AddEditProducts/>}/>
        
          
        </Route>
        <Route path="/contact" element={<Contact />} />
        
      </Routes>
    </Router>
  );
};

export default ReactRoutes;
