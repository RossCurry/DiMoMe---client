/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Profile.styles.scss';
import { useAppSelector } from '../../redux/hooks';
import editLocal from '../../assets/svg/edit_local.svg';
import editUser from '../../assets/svg/edit_user.svg';

const Profile = (): JSX.Element => {
  const { user } = useAppSelector((state) => state);
  const history = useHistory();
  useEffect(() => {
    if (user._id === 0) history.push('/login');
  }, [user, history]);
  return (
    <div className="profile-page">
      <div className="profile-msg">
        <h2>Hi {user.name}!</h2>
        <p>What would you like to do today?</p>
      </div>
      <div className="profile-options-container">
        <Link to={`/editProfile/${user._id}`}>
          <div className="profile-card">
            <h2>Edit Profile</h2>
            <img src={editUser} alt="Edit currentUser profile icon" />
          </div>
        </Link>
        <Link to={`/editMenu/${user._id}/${user.localName}`}>
          <div className="profile-card">
            <h2>Edit {user.localName}</h2>
            <img src={editLocal} alt="Edit user local icon" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
