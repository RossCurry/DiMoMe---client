import React, {useState, useEffect} from 'react';
import { usersDB } from '../ApiService'

function Profile({ match }) {

  const pathId = match.params;
  console.log('pathId', pathId);

  const initialState = {
    name: '',
    LocalName: '',
    LocalType: '',
    id: 0,
  }

  const [user, setUser] = useState(initialState)


  const getProfile = () => {
    //normally from api
    
  }

  useEffect(() => {
    getProfile()
  }, [])


  return (
    <div>
      <h2>I'm your profile</h2>
    </div>
  );
}

export default Profile;