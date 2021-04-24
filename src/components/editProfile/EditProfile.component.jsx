import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './EditProfile.styles.scss'

function EditProfile(props) {

  const currentUser = useSelector(state => state.currentUser.user)
  console.log('currentUser', currentUser);

  return (
    <React.Fragment>
      <div className="edit-profile-container">

      <div className="edit-profile-left"></div>
      <div>
      <form className="edit-profile-form">

<label for="email">You can change your email address here</label>

<input
  type="text"
  placeholder={currentUser ? currentUser.email : "Type your new email here..."} name="email"
/>

<label for="name">You can change your profile name</label>

<input
  type="text"
  placeholder={currentUser ? currentUser.name : "Type your new name here..."} 
  name="name" 
/>

<label for="nameLocal">You can change name of your here</label>

<input
  type="text"
  placeholder={currentUser ? currentUser.localName : `Type the new name of your local here...`} 
  name="localName" 
/>

<input type="submit" value={"Update"} />

</form>
      </div>

        

      </div>
    </React.Fragment>
  );
}

export default EditProfile;