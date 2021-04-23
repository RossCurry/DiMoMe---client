import React, {useState, useEffect} from 'react';
import { usersDB } from '../ApiService' // might need, might not, redux solution
import './Profile.styles.scss'
import editLocal from '../assets/svg/edit_local.svg'
import editUser from '../assets/svg/edit_user.svg'


function Profile(props) {

  const pathId = props.match.params;
  const userFromProps = props.location.state;
  console.log('userFromProps', userFromProps);

  const initialState = {
    name: '',
    localName: '',
    localType: '',
    id: 0,
  }

  const [user, setUser] = useState(initialState);

  useEffect(()=>{
    setUser(userFromProps)
  },[]);

  return (
    <div className="profile-page">
      
      <div className="profile-msg">
        <h2>Hi {user.name}!</h2>
        <p>What would you like to do today?</p>
      </div>

      <div className="profile-options-container">
        
        <div className="profile-card">
          <h2>Edit Profile</h2>
          <img src={ editUser} alt="Edit user profile icon" />
        </div>
        
        <div className="profile-card">
          <h2>Edit {user.localName}</h2>
          <img src={editLocal } alt="Edit user local icon" />
        </div>

      </div>

    </div>
  );
}

export default Profile;