import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { usersDB } from '../../ApiService' // might need, might not, redux solution
import './Profile.styles.scss'
import editLocal from '../../assets/svg/edit_local.svg'
import editUser from '../../assets/svg/edit_user.svg'
import { useSelector } from 'react-redux';

function Profile(props) {

  // const userFromProps = props.location.state;
  // console.log('userFromProps', userFromProps);
  const currentUser = useSelector(state => state.currentUser.user)

  // const initialState = {
  //   name: '',
  //   localName: '',
  //   localType: '',
  //   _id: 0,
  // }

  // const [user, setUser] = useState(initialState);

  // useEffect(()=>{
  //   setUser(userFromProps)
  // },[]);

  return (
    <div className="profile-page">
      
      <div className="profile-msg">
        <h2>Hi {currentUser.name}!</h2>
        <p>What would you like to do today?</p>
      </div>

      <div className="profile-options-container">
        
        <Link to={`/editProfile/${currentUser._id}`}>
          <div className="profile-card">
            <h2>Edit Profile</h2>
            <img src={ editUser} alt="Edit currentUser profile icon" />
          </div>
        </Link>
        
        <Link to={`/editMenu/${currentUser._id}/${currentUser.localName}`}>
          <div className="profile-card">
            <h2>{currentUser.localName}</h2>
            <img src={editLocal } alt="Edit user local icon" />
          </div>
        </Link>

      </div>

    </div>
  );
}

export default Profile;