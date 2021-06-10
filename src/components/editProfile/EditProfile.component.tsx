/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { useSelector } from 'react-redux';
import './EditProfile.styles.scss';

export const mockCurrentUser = {
  _id: 5,
  email: 'string@fffe.com',
  name: 'yellow',
  localType: 'string',
  localName: 'string',
};

const EditProfile = (): JSX.Element => {
  // TODO i'm having this redux issue all over the place
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const currentUser = useSelector((state) => state.currentUser.user);
  const currentUser = mockCurrentUser;
  return (
    <>
      <div className="edit-profile-container">
        <form className="edit-profile-form">
          <label htmlFor="email-profile">
            You can change your email address here
            <input
              type="text"
              placeholder={
                currentUser ? currentUser.email : 'Type your new email here...'
              }
              name="email"
              id="email-profile"
            />
          </label>
          <label htmlFor="name-profile">
            You can change your profile name
            <input
              type="text"
              placeholder={
                currentUser ? currentUser.name : 'Type your new name here...'
              }
              name="name"
              id="name-profile"
            />
          </label>
          <label htmlFor="nameLocal-profile">
            You can change name of your here
            <input
              type="text"
              placeholder={
                currentUser
                  ? currentUser.localName
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
