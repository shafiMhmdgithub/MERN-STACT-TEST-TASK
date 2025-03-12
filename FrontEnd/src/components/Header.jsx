import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { login,logout} from '../redux/authSlice';
const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated= useSelector((state)=>state.auth.isAuthenticated);
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" onClick={() => { setEditProfile(false); setViewProfile(false); }} className="nav-link">Home</Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}
          <li className="nav-item">
            <a className="nav-link" data-widget="navbar-search" href="#" role="button">
              <i className="fas fa-search" />
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          {/* Profile Dropdown Menu */}
           {/* Profile Dropdown Menu */}
           <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-user" />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
{/* Conditionally render based on `isAuthenticated` */}
{!isAuthenticated ? (
                <>
                  <Link to="/login" onClick={() => dispatch(login())} className="dropdown-item">
                    <i className="fas fa-sign-in-alt mr-2" /> Login
                  </Link>
                  <div className="dropdown-divider" />
                  <Link to="/signup" onClick={() => dispatch(login())} className="dropdown-item">
                    <i className="fas fa-user-plus mr-2" /> Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" onClick={() => dispatch(logout())} className="dropdown-item">
                    <i className="fas fa-sign-out-alt mr-2" /> Logout
                  </Link>
                </>
              )}
            </div> 
          </li>
        </ul>
      </nav>
      {/* /.navbar */}
    </div>
  )
}

export default Header