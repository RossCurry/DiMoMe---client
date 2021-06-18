/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import './EditProfile.styles.scss';

const EditProfile = (): JSX.Element => {
  const { user } = useAppSelector((state) => state);
  const history = useHistory();
  useEffect(() => {
    if (user._id === 0) history.push('/login');
  }, [user, history]);
  return (
    <>
      <div className="edit-profile-container">
        <form className="edit-profile-form">
          <label htmlFor="email-profile">
            You can change your email address here
            <input
              type="text"
              placeholder={user ? user.email : 'Type your new email here...'}
              name="email"
              id="email-profile"
            />
          </label>
          <label htmlFor="name-profile">
            You can change your profile name
            <input
              type="text"
              placeholder={user ? user.name : 'Type your new name here...'}
              name="name"
              id="name-profile"
            />
          </label>
          <label htmlFor="nameLocal-profile">
            You can change name of your here
            <input
              type="text"
              placeholder={
                user
                  ? user.localName
                  : `Type the new name of your local here...`
              }
              name="localName"
              id="nameLocal-profile"
            />
          </label>
          {/* // TODO create a handler for this update. */}
          <input type="submit" value="Update" />
        </form>
      </div>
    </>
  );
};

export default EditProfile;
