import React from 'react';
import './Navbar.styles.scss'
import { Link } from 'react-router-dom';
import Logo from '../assets/svg/logo.svg';

// const Logo = require('../assets/svg/logo.svg')

function Navbar(props) {
  return (
    <div className="navbar">

      <Link to={'/'}>
        <img src={Logo} className="logo" />
      </Link>

      <div className="login">
        <Link to={'/login'}>
          <p>Already have an account? Login</p>
        </Link>

        <Link to={'/subscribe'}>
          < div className="login-img"></div>
        </Link>
      </div>
    </div >
  );
}

export default Navbar;