
import React from 'react'; 
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setEditProfile, setViewProfile } from '../redux/profileSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditProfile=()=>{
    navigate('/')
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="#" onClick={() => { setEditProfile(false); setViewProfile(false); }} className="nav-link">Home</Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="#" onClick={() => { dispatch(setEditProfile(true))}} className="nav-link">Profile</Link>
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
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-user" />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item" onClick={() => {
                dispatch(setViewProfile(true));
                dispatch(setEditProfile(false));
                // Ensure editProfile is false
              }}>
                <i className="fas fa-user mr-2" /> View Profile
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item" onClick={() => {
                dispatch(setEditProfile(true));
                dispatch(setViewProfile(false));
                // Ensure viewProfile is false
              }}>
                <i className="fas fa-user-edit mr-2" /> Edit Profile
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" onClick={handleEditProfile}>
                <i className="fas fa-sign-out-alt mr-2" /> Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
      {/* /.navbar */}
    </div>
  )
}

export default Header;
