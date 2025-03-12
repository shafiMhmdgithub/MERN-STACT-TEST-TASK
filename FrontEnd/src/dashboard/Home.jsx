
import React from 'react';

import EditProfile from './EditProfile';
import ViewProfile from './ViewProfile';
import AddEditProducts from './Products/AddEditProducts';
import MainContent from './MainContent';
import ViewProducts from './Products/ViewProducts';
import ViewUsers from './users/ViewUsers';
import { useSelector } from 'react-redux';

const Home = () => {

  const {editProfile,viewProfile} = useSelector((state)=>state.profile);
  const {addEditProducts,viewProducts} =useSelector((state)=>state.product);
  const { viewAllUser } = useSelector((state)=>state.users);
  const {user}=useSelector((store)=>store.users)||[];
  console.log('viewall users...',viewAllUser);
  console.log("users from the store..",user)
  // Conditionally render the profile form or product form
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              {/* Show either profile form or product form */}
              {editProfile ? (
                <h1>Edit Profile</h1>
              ) : viewProfile ? (
                <h1>View Profile</h1>
              ) : addEditProducts ? (
                <h1>Add/Edit Product</h1>
              ) :viewProducts ? (
                <h1>View Products</h1>
              ) :viewAllUser ? (
                <h1>View Users</h1>
              ): (
                <h1>Dashboard</h1>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Render the correct component based on the state or route */}
      {editProfile || viewProfile ? (
        // If viewing or editing profile, render the profile components
        editProfile ? <EditProfile /> : <ViewProfile />
      ) : addEditProducts ? (
        // If navigating to Add/Edit Product page, render the product form
        <AddEditProducts />
      ) : viewProducts ? (
        // If navigating to Add/Edit Product page, render the product form
        <ViewProducts />
      ) :
       viewAllUser ? (
        // If navigating to Add/Edit Product page, render the product form
        <ViewUsers/>
      ) : (
        // Default to main content (dashboard)
        <MainContent />
      )}
    </div>
  );
};

export default Home;
