
import ReactRoutes from '../ReactRoutes'

function App() {

  return (
    <div> 
    <ReactRoutes/>
    </div>
  )
}

export default App

// // src/ProtectedApp.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import ReactRoutes from '../ReactRoutes';
// import { useSelector } from 'react-redux';

// const ProtectedApp = () => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   return isAuthenticated ? <ReactRoutes /> : <Navigate to="/login" />;
// };

// export default ProtectedApp;