import React, { useState } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import Home from './Home';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [addEditProducts, setaddEditProducts] = useState(false);
  const [viewProducts, setViewProducts] = useState(false);
  const [viewAllUsers, setViewAllUsers] = useState(false);


  return (
    <div>
      <Header 
        editProfile={editProfile} 
        setEditProfile={setEditProfile} 
        viewProfile={viewProfile} 
        setViewProfile={setViewProfile}
      />
      <SideBar
       setaddEditProducts={setaddEditProducts}
       setViewProducts={setViewProducts}
       />
      <Home 
        editProfile={editProfile} 
        viewProfile={viewProfile} 
        setEditProfile={setEditProfile} 
        setViewProfile={setViewProfile}
        addEditProducts={addEditProducts}
        setaddEditProducts={setaddEditProducts}
        setViewProducts={setViewProducts}
        viewProducts={viewProducts}
        viewAllUsers={viewAllUsers}
      />
      <Outlet/>
      {/* <SparklineComponent data={sparklineData} /> Pass dynamic data */}
      <Footer />
    </div>
  );
};

export default Dashboard;
