import React from 'react';
import './Navbar.styles.scss'
import { Link } from 'react-router-dom';
import Logo from '../../assets/svg/logo.svg';
import { useSelector } from 'react-redux';

// const Logo = require('../assets/svg/logo.svg')

function Navbar(props) {

  const currentUser = useSelector(state => state.currentUser.user)

  console.log('currentUser state', currentUser);

  // const loginText = () => {
  //   return (

  //   )
  // }

  // const userMsg = () => {
  //   return (
      
  //   )
  // }


  return (
    <div className="navbar">

      <Link to={currentUser ? `/profile/${currentUser._id}` : '/'}>
        <img src={Logo} className="logo" alt="Logo for DiMoMe"/>
      </Link>

      <div className="login">
          <p>{!currentUser ? "Already have an account?" : ``}</p>
        <Link to={currentUser ? '/login' : '/login'}>
            <p>{currentUser ?  "Log out" : 'Log in'}</p>
        </Link>

    

        <Link to={'/subscribe'}>
          < div className="login-img"></div>
        </Link>
      </div>
    </div >
  );
}

export default Navbar;