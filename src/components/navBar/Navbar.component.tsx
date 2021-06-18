/* eslint-disable no-underscore-dangle */
import React from 'react';
import './Navbar.styles.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import Logo from '../../assets/svg/logo.svg';

const Navbar = (): JSX.Element => {
  const { user } = useAppSelector((state) => state);
  return (
    <div className="navbar">
      <Link to={user ? `/profile/${user._id}` : '/'}>
        <img src={Logo} className="logo" alt="Logo for DiMoMe" />
      </Link>

      <div className="login">
        <p>{!user ? 'Already have an account?' : ``}</p>
        <Link to={user ? '/login' : '/login'}>
          <p>{user ? 'Log out' : 'Log in'}</p>
        </Link>

        <Link to={'/subscribe' as string}>
          <div className="login-img" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
