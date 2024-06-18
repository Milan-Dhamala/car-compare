import React, { useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import StoreContext from '../../contexts/StoreContext';

const Navbar = () => {
  const { token, logout } = useContext(StoreContext);

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />
      {token && (
        <button className='logout-button' onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
