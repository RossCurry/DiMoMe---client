import React, {useState, useEffect} from 'react';
import { usersDB } from '../ApiService'

function Profile(props) {

  const pathId = props.match.params;
  const userFromProps = props.location.state;

  const initialState = {
    name: '',
    LocalName: '',
    LocalType: '',
    id: 0,
  }

  const [user, setUser] = useState(initialState);

  useEffect(()=>{
    setUser(userFromProps);
  },[]);

  return (
    <div>
      <h2>Hi {user.name}!</h2>
    </div>
  );
}

export default Profile;