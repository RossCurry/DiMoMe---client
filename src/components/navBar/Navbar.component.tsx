/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import './Navbar.styles.scss';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../assets/svg/logo.svg';
import { currentUser as currentUserType } from '../../redux/reducers';
import { mockCurrentUser } from '../editProfile/EditProfile.component';

const Navbar = (): JSX.Element => {
  // TODO figure out how to type the redux state
  // const { user } = useSelector<currentUserType>(
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //   (state) => state
  // );
  const user = mockCurrentUser;
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
