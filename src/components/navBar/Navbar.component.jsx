import React from 'react';
import './Navbar.styles.scss'
import { Link } from 'react-router-dom';
import Logo from '../../assets/svg/logo.svg';

// const Logo = require('../assets/svg/logo.svg')

function Navbar(props) {
  return (
    <div className="navbar">

      <Link to={'/'}>
        <img src={Logo} className="logo" alt="Logo for DiMoMe"/>
      </Link>

      <div className="login">
          <p>Already have an account?</p>
        <Link to={'/login'}>
            <p> Login</p>
        </Link>

        <Link to={'/subscribe'}>
          < div className="login-img"></div>
        </Link>
      </div>
    </div >
  );
}

export default Navbar;