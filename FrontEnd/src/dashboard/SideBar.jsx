import React from 'react'
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import {setAddEditProducts,setViewProducts} from '../redux/productSlice';
import { setEditProfile, setViewProfile } from '../redux/profileSlice';
import { userSliceActions } from '../redux/userSlice';

const SideBar = () => {
  const dispatch = useDispatch();
  const handleAddEditProduct=()=>{
    dispatch(setAddEditProducts(true));
    dispatch(setEditProfile(false));
    dispatch(setViewProfile(false));
  }

  const handleViewProducts=()=>{
    dispatch(setViewProducts(true));
    dispatch(setEditProfile(false));
    dispatch(setViewProfile(false));
  }

  const handleViewUsers=()=>{
    dispatch(setViewProducts(false));
    dispatch(setEditProfile(false));
    dispatch(setViewProfile(false));
    dispatch(userSliceActions.showAllUser(true));
  }
  return (
    <div>
    {/* Main Sidebar Container */}
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">AdminLTE 3</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="info">
        <a href="/admin" className="d-block">Admin</a>
      </div>
    </div>
    {/* SidebarSearch Form */}
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        <li className="nav-item menu-open">
          <a href="#" className="nav-link active">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Dashboard
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          
        </li>
        {/* Products */}
        <li className="nav-item menu-open">
          <Link href="#" className="nav-link active">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Products
              <i className="right fas fa-angle-left" />
            </p>
          </Link>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link to="#" onClick={handleAddEditProduct} className="nav-link active">
                <i className="far fa-circle nav-icon" />
                <p>Add Products</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" onClick={handleViewProducts} className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>View Products</p>
              </Link>
            </li>
          </ul>
        </li>
       
        <li className="nav-item menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-user" />
                 <p>Users</p>
               </a>
               <ul className="nav nav-treeview">
                   <li className="nav-item">
                    <Link to="#" className="nav-link" onClick={handleViewUsers}>
                               <i className="far fa-user nav-icon" />
                       <p>View Users</p>
                     </Link>
                  </li>
                </ul>
        </li>
        

        
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

    </div>
  )
}

export default SideBar


// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { productSliceActions } from '../store/productSlice';
// import { userSliceActions } from '../store/userSlice';

// const SideBar = () => {
//   const dispatch = useDispatch();

 

//   const handleAddEditProduct = (event) => {
//     event.preventDefault();
//     console.log("Button clicked to show Add Product..");
//     // Show Add Product, hide View Products and Users
//     dispatch(productSliceActions.showAddNewProduct());
//     dispatch(productSliceActions.viewAllProducts(false));
//     dispatch(userSliceActions.showAllUser(false));
//     dispatch(userSliceActions.showAddUser(false));
//   };

//   const handleAddUser = () => {
//     // Show Add User, hide View User and Products
//     dispatch(userSliceActions.showAddUser());
//     dispatch(userSliceActions.showAllUser(false));
//     dispatch(productSliceActions.viewAllProducts(false));
//     dispatch(productSliceActions.showAddNewProduct(false));
//   };

//   return (
//     <div>
//       {/* Main Sidebar Container */}
//       <aside className="main-sidebar sidebar-dark-primary elevation-4">
//         {/* Brand Logo */}
//         <a href="#" className="brand-link">
//           <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
//           <span className="brand-text font-weight-light">AdminLTE 3</span>
//         </a>
//         {/* Sidebar */}
//         <div className="sidebar">
//           {/* Sidebar user panel (optional) */}
//           <div className="user-panel mt-3 pb-3 mb-3 d-flex">
//             <div className="image">
//               <img src="/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
//             </div>
//             <div className="info">
//               <a href="#" className="d-block">Alexander Pierce</a>
//             </div>
//           </div>
//           {/* SidebarSearch Form */}
//           <div className="form-inline">
//             <div className="input-group" data-widget="sidebar-search">
//               <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
//               <div className="input-group-append">
//                 <button className="btn btn-sidebar">
//                   <i className="fas fa-search fa-fw" />
//                 </button>
//               </div>
//             </div>
//           </div>
//           {/* Sidebar Menu */}
//           <nav className="mt-2">
//             <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
//               {/* Dashboard */}
//               <li className="nav-item menu-open">
//                 <a href="#" className="nav-link active">
//                   <i className="nav-icon fas fa-tachometer-alt" />
//                   <p>Dashboard</p>
//                 </a>
//               </li>
//               {/* Products */}
//               <li className="nav-item menu-open">
//                 <a href="#" className="nav-link active">
//                   <i className="nav-icon fas fa-box" />
//                   <p>Products</p>
//                 </a>
//                 <ul className="nav nav-treeview">
//                   <li className="nav-item">
//                     <a href="#" className="nav-link" onClick={handleAddEditProduct}>
//                       <i className="far fa-circle nav-icon" />
//                       <p>View Products</p>
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               {/* Users */}
//               {/* <li className="nav-item menu-open">
//                 <a href="#" className="nav-link active">
//                   <i className="nav-icon fas fa-user" />
//                   <p>Users</p>
//                 </a>
//                 <ul className="nav nav-treeview">
//                   <li className="nav-item">
//                     <a href="#" className="nav-link" onClick={handleAddUser}>
//                       <i className="far fa-user nav-icon" />
//                       <p>View User</p>
//                     </a>
//                   </li>
//                 </ul>
//               </li> */}
//             </ul>
//           </nav>
//           {/* /.sidebar-menu */}
//         </div>
//         {/* /.sidebar */}
//       </aside>
//     </div>
//   );
// };

// export default SideBar;
